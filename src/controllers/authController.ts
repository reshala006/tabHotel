import { Request, Response } from "express"
import { prisma } from "../utils/prisma"
import { hashPassword, comparePassword, generateToken } from "../utils/auth"
import { RegisterRequest, LoginRequest, AuthResponse } from "../types"
import { AuthRequest } from "../middleware/auth"

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, firstName, lastName, phoneNumber } = req.body
        let { role } = req.body
        const { key } = req.body

        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            res.status(400).json({ message: "User with this email already exists" })
            return
        }

        const hashedPassword = await hashPassword(password)
        if (role === "admin") {
            if (key === "key") {
                console.log("Key is correct")
            } else {
                role = "guest"
            }
        }

        const user = await prisma.user.create({
            data: {
                email,
                password_hash: hashedPassword,
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber,
                role: role,
            },
        })

        const token = generateToken({
            id: user.id,
            email: user.email,
            role: user.role,
        })

        const response: AuthResponse = {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                role: user.role,
            },
            token,
        }

        res.status(201).json(response)
    } catch (error) {
        console.error("Registration error:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body

        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user || !(await comparePassword(password, user.password_hash))) {
            res.status(401).json({ message: "Invalid email or password" })
            return
        }

        const token = generateToken({
            id: user.id,
            email: user.email,
            role: user.role,
        })

        const response: AuthResponse = {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                role: user.role,
            },
            token,
        }

        res.status(200).json(response)
    } catch (error) {
        console.error("Login error:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id

        if (!userId) {
            res.status(401).json({ message: "Not authenticated" })
            return
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                first_name: true,
                last_name: true,
                role: true,
                phone_number: true,
                created_at: true,
            },
        })

        if (!user) {
            res.status(404).json({ message: "User not found" })
            return
        }

        res.status(200).json({
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            role: user.role,
            phoneNumber: user.phone_number,
            createdAt: user.created_at,
        })
    } catch (error) {
        console.error("Get me error:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}
