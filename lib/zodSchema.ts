import * as z from "zod";

export const registerFormSchema = z.object({
	fullname: z.string().min(2),
	password: z.string().min(8, "Minimum 8 characters required!"),
	email: z.string().email("Invalid email address!"),
});

export type registerFormData = z.infer<typeof registerFormSchema>;

export const loginFormSchema = z.object({
	email: z.string().email("Invalid email address!"),
	password: z.string().min(8, "Minimum 8 characters required!"),
});

export type loginFormData = z.infer<typeof loginFormSchema>;

export const verifyCodeSchema = z.object({
	code: z.string().length(6, "Code must be 6 digits"),
});

export type verifyCodeData = z.infer<typeof verifyCodeSchema>;

export const scheduleFormSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().optional(),
	dateTime: z.date({
		required_error: "A date and time is required",
	}),
});

export type scheduleFormData = z.infer<typeof scheduleFormSchema>;
