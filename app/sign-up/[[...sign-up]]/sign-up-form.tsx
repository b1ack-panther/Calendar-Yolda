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
import { registerFormData, registerFormSchema } from "@/lib/zodSchema";
import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

const SignUpForm = ({
	setVerifying,
}: {
	setVerifying: Dispatch<SetStateAction<boolean>>;
}) => {
	const [message, setMessage] = useState<SqlResponse>();
	const { signUp, isLoaded } = useSignUp();

	const form = useForm<registerFormData>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			fullname: "",
			email: "",
			password: "",
		},
	});

	// Handle submission of the sign-up form
	const handleSubmit = async (formdata: registerFormData) => {
		const validatedData = registerFormSchema.safeParse(formdata);
		if (!validatedData.success) {
			return { error: "Invalid fields!" };
		}

		const {
			data: { fullname, email, password },
		} = validatedData;

		if (!isLoaded) return;

		// Start the sign-up process using the email and password provided
		try {
			await signUp.create({
				emailAddress: email,
				firstName: fullname.split(" ")[0],
				lastName: fullname.split(" ")?.slice(1)?.join(" "),
				password,
			});

			// Send the user an email with the verification code
			await signUp.prepareEmailAddressVerification({
				strategy: "email_code",
			});

			// Set 'verifying' true to display second form
			// and capture the OTP code
			setVerifying(true);
		} catch (err: any) {
			const error = isClerkAPIResponseError(err)
				? err.errors[0].message
				: "Something went wrong!";
			setMessage({ error });
			console.error("Error:", JSON.stringify(err, null, 2));
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
				<CardHeader className="text-center">
					<CardTitle className="text-3xl font-bold">Register</CardTitle>
					<CardDescription>Enter your details</CardDescription>
				</CardHeader>

				<CardContent className="space-y-4">
					<FormField
						control={form.control}
						name="fullname"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										autoComplete="disable"
										placeholder="Your Fullname"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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
						<span>Register</span>
						{form.formState.isSubmitting && <Loading />}
					</Button>
					<p className="text-sm">
						Already have account?{" "}
						<Link href="/sign-in" className="underline">
							Sign-in here
						</Link>
					</p>
				</CardFooter>
			</form>
		</Form>
	);
};

export default SignUpForm;
