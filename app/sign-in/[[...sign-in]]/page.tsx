"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import Loading from "@/components/Loading";
import { loginFormData, loginFormSchema } from "@/lib/zodSchema";
import { AuthMessage } from "@/components/auth-message";
import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";

const LoginPage = () => {
	const { isLoaded, signIn, setActive } = useSignIn();
	const [message, setMessage] = useState<SqlResponse | undefined>();
	const router = useRouter();
	const form = useForm<loginFormData>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// Handle the submission of the sign-in form
  const handleSubmit = async (formdata: loginFormData) => {
    
		const validatedData = loginFormSchema.safeParse(formdata);
		if (!validatedData.success) {
			return { error: "Invalid fields!" };
		}
    const { email, password } = validatedData.data;
    
		if (!isLoaded) {
			return;
		}
		// Start the sign-in process using the email and password provided
		try {
			const signInAttempt = await signIn.create({
				identifier: email,
				password,
			});
			// If sign-in process is complete, set the created session as active
			// and redirect the user
			if (signInAttempt.status === "complete") {
				await setActive({ session: signInAttempt.createdSessionId });
				router.push("/");
			} else {
				setMessage({ error: "Something went wrong!" });
				console.error(JSON.stringify(signInAttempt, null, 2));
			}
		} catch (err) {
      const error = isClerkAPIResponseError(err) ? err.errors[0].message : "Something went wrong!";
			setMessage({ error });
			console.error(JSON.stringify(err, null, 2));
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen w-full">
			<Card className="w-full max-w-md">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
						<CardHeader className="text-center">
							<CardTitle className="text-3xl font-bold">Login</CardTitle>
							<CardDescription>Enter your Account details here</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="your-email@example.com" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="Your password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
						<CardFooter className="flex flex-col gap-4 items-start">
							<AuthMessage message={message} />
							<Button
								disabled={form.formState.isSubmitting}
								type="submit"
								className="w-full space-x-2"
							>
								<span>Login</span>
								{form.formState.isSubmitting && <Loading />}
							</Button>
							<p className="text-sm">
								Don&apos;t have account?{" "}
								<Link href="/sign-up" className="underline">
									Sign-up here
								</Link>
							</p>
						</CardFooter>
					</form>
				</Form>
			</Card>
		</div>
	);
};

export default LoginPage;
