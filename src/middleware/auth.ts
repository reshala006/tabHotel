import { Request, Response, NextFunction } from "express"
import { verifyToken } from "../utils/auth"

export interface AuthRequest extends Request {
    user?: {
        id: number
        email: string
        role: string
    }
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.cookies.authorization
    console.log(req.cookies)
    const token = authHeader

    if (!token) {
        res.status(401).json({ message: "Access token required" })
        return
    }

    try {
        const decoded = verifyToken(token)
        req.user = decoded
        next()
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token" })
    }
}

export const requireRole = (roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        if (!req.user) {
            res.status(401).json({ message: "Authentication required" })
            return
        }

        if (!roles.includes(req.user.role)) {
            res.status(403).json({ message: "Insufficient permissions" })
            return
        }

        next()
    }
}
