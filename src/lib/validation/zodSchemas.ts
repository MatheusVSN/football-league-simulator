import { z } from "zod";

export const registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username can't exceed 20 characters"),
    email: z.string().email("Please provide a valid email"),
    password: z.string().min(8, "Password must at least contain 8 characters")
})

export const loginSchema = z.object({
    username: z.string().min(3, "Username must at least contain 3 characters").max(20, "Username can't exceed 20 characters"),
    password: z.string().min(8, "Password must at least contain 8 characters")
})

export const clientRegisterSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username can't exceed 20 characters"),
    email: z.string().email("Please provide a valid email"),
    password: z.string().min(8, "Password must at least contain 8 characters"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
})

export const universeCreationSchema = z.object({
    name: z.string().min(1, "Name can't be empty"),
    rating: z.enum(["fixed", "semi", "random"], {
        errorMap: () => ({ message: "Invalid rating mode choice. It must be either fixed, semi or random" })
    })
})

export const editStatsSchema = z.object({
    rating: z.coerce.number().min(1, "Rating cannot be less than 1").max(99, "Rating  cannot exceed 99")
})