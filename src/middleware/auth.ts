import { Request, Response, NextFunction } from "express"
import { verifyToken } from "../utils/auth"

export interface AuthRequest extends Request {
    user?: {
        id: number
        email: string
        role: string
    }
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({ message: "Access token required" })
    }

    try {
        const decoded = verifyToken(token)

        req.user = decoded
        next()
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" })
    }
}

export const requireRole = (roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: "Authentication required" })
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Insufficient permissions" })
        }

        next()
    }
}
