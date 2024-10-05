import { AuthMessage } from "@/components/auth-message";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	verifyCodeData,
	verifyCodeSchema,
} from "@/lib/zodSchema";
import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const SignUpForm = () => {
	const [message, setMessage] = useState<SqlMessage>();
	const { isLoaded, signUp, setActive } = useSignUp();
	const router = useRouter();
	const form = useForm<verifyCodeData>({
		resolver: zodResolver(verifyCodeSchema),
	});

	const handleVerify = async (formdata: verifyCodeData) => {
		const validatedData = verifyCodeSchema.safeParse(formdata);
		if (!validatedData.success) {
			return { error: "6 digit code i required!" };
		}

		const { code } = validatedData.data;
		if (!isLoaded) return;

		try {
			// Use the code the user provided to attempt verification
			const signUpAttempt = await signUp.attemptEmailAddressVerification({
				code,
			});

			// If verification was completed, set the session to active
			// and redirect the user
			if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });        
				router.push("/");
			} else {
				setMessage({ error: "Something went wrong!" });
				console.error(JSON.stringify(signUpAttempt, null, 2));
			}
		} catch (err) {
			const error = isClerkAPIResponseError(err)
				? err.errors[0].message
				: "Something went wrong!";
			setMessage({ error });
			console.error("Error:", JSON.stringify(err, null, 2));
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleVerify)}>
				<CardHeader className="text-center">
					<CardTitle className="text-3xl font-bold">Register</CardTitle>
					<CardDescription>Verify Your Email</CardDescription>
				</CardHeader>

				<CardContent className="space-y-4">
					<FormField
						control={form.control}
						name="code"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Enter the code sent to email</FormLabel>
								<FormControl>
									<Input placeholder="******" {...field} />
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
						<span>Verify</span>
						{form.formState.isSubmitting && <Loading />}
					</Button>
				</CardFooter>
			</form>
		</Form>
	);
};

export default SignUpForm;
