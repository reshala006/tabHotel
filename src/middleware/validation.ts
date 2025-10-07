import { Request, Response, NextFunction } from "express"
import { z } from "zod"

export const registerSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phoneNumber: z.string().optional(),
    role: z.enum(["guest", "admin", "maid", "manager"]),
    key: z.string(),
})

export const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required"),
})

export const validate = (schema: z.ZodSchema<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body)
            next()
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errors = error.issues.map((err) => ({
                    field: err.path.join("."),
                    message: err.message,
                }))
                res.status(400).json({
                    message: "Validation failed",
                    errors,
                })
            } else {
                res.status(500).json({ message: "Internal server error" })
            }
        }
    }
}
