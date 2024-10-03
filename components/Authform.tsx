import React, { useState } from "react";

interface AuthformProps {
	type: "sign-in" | "sign-up";
}

const Authform: React.FC<AuthformProps> = ({ type }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const response = await fetch(`/api/auth/${type}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});
		const data = await response.json();
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Email"
				required
			/>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
				required
			/>
			<button type="submit">
				{type === "sign-in" ? "Sign In" : "Sign Up"}
			</button>
		</form>
	);
};
export default Authform;
