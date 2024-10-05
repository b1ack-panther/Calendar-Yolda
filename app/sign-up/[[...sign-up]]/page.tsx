"use client";

import { Card } from "@/components/ui/card";
import { useState } from "react";
import VerifyEmailForm from "./verify-email-form";
import SignUpForm from "./sign-up-form";

const RegisterPage = () => {
	const [verifying, setVerifying] = useState(false);

	return (
		<div className="flex items-center justify-center min-h-screen w-full">
			<Card className="w-full max-w-md">
				{verifying ? (
					<VerifyEmailForm />
				) : (
					<SignUpForm setVerifying={setVerifying} />
				)}
			</Card>
		</div>
	);
};

export default RegisterPage;
