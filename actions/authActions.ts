"use server";

import bcrypt from "bcrypt";

import {
	loginFormData,
	loginFormSchema,
	registerFormData,
	registerFormSchema,
} from "@/lib/zodSchema";
import { sql } from "@vercel/postgres";
import { encrypt } from "@/lib/jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/lib/getUser";
import { signIn } from "@/auth";
import { DEFAULT_REDIRECT } from "@/middleware";
import { AuthError } from "next-auth";

export const userSignUp = async (
	formdata: registerFormData
): Promise<SqlMessage> => {
	const validatedData = registerFormSchema.safeParse(formdata);
	if (!validatedData.success) {
		return { error: "Invalid fields!" };
	}

	const {
		data: { name, email, password },
	} = validatedData;

	try {
		const alreadyExists = await getUserByEmail(email);
		if (alreadyExists) return { error: "Email already in use!" }
		
		const hashedPassword = await bcrypt.hash(password, 10);

		const res = await sql`INSERT INTO users (name, email, password) 
                         VALUES (${name}, ${email}, ${hashedPassword})
                         RETURNING id, name, email`;
		if (res.rows.length > 0) {
			return { success: "User created successfully!" };
		}
		throw new Error("User creation failed");
	} catch (error) {
		const errorMessage =
			(error as { detail?: string }).detail ?? "Something went wrong!";
		return { error: errorMessage };
	}
};

export const userSignIn = async (formdata: loginFormData) => {
	const validatedData = loginFormSchema.safeParse(formdata);
	if (!validatedData.success) {
		return { error: "Invalid fields!" };
	}

	const { email, password } = validatedData.data;

	// const res = await sql`SELECT name, email, id, password from users`;
	// if (res.rows.length < 1) {
	// 	return { error: "Email not found" };
	// }

	// const user = res.rows[0];

	// const isPasswordCorrect = await bcrypt.compare(password, user.password);
	// if (!isPasswordCorrect) {
	// 	return { error: "Invalid credentails!" };
	// }

	// const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);
	// const session = await encrypt({
	// 	user: { email, name: user.name, id: user.id },
	// 	expires,
	// });
	// cookies().set("session", session, { expires, httpOnly: true });
	try {
		signIn("credentials", {email, password, redirectTo: DEFAULT_REDIRECT})
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: "Invalid credentials!" }
				default:
					return {error: "Something went wrong!"}
			}
		}
		throw error;
	}
};

export const logout = () => {
	cookies().delete("session");
	return redirect("/sign-in");
};
