import { z } from "zod";

export const emailSchema = z
    .string({ required_error: "Email is required" })
    .email("Invalid email address")
    .toLowerCase()
    .transform((val) => val.trim());

export const passwordSchema = z
    .string()
    .min(10, "Password must be at least 10 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
        /[\!\@\#\$\%\^\&\*\(\)\?\.\-_]/,
        "Password must contain at least one special character (!@#$%^&*()?._-)"
    );

export const nameSchema = z
    .string({ required_error: "Name is required" })
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must be max 20 characters")
    .transform((val) => val.trim());

export const signupSchema = z
    .object({
        name: nameSchema,
        email: emailSchema,
        password: passwordSchema,
        confirmPassword: passwordSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export const signinSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email("Invalid email address").toLowerCase()
        .transform((val) => val.trim()),
    password: passwordSchema,
});

export const resetPasswordSchema = z.object({
        password: passwordSchema,
        confirmPassword: passwordSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });