import * as z from "zod";

export const registerFormSchema = z.object({
  fullname: z.string().min(2),
  password: z.string().min(8, "Minimum 8 characters required!"),
  email: z.string().email("Invalid email address!")
});

export type registerFormData = z.infer<typeof registerFormSchema>;

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email address!"),
  password: z.string().min(8, "Minimum 8 characters required!")
});

export type loginFormData = z.infer<typeof loginFormSchema>;

export const verifyCodeSchema = z.object({
  code: z.string().length(6, "Code must be 6 digits")
});

export type verifyCodeData = z.infer<typeof verifyCodeSchema>;