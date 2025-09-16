import { Router } from "express"
import { register, login, getMe } from "../controllers/authController"
import { authenticateToken } from "../middleware/auth"
import { validate, registerSchema, loginSchema } from "@/middleware/validation"

const router = Router()

router.post("/register", validate(registerSchema), register)

router.post("/login", validate(registerSchema), login)

router.get("/me", authenticateToken, getMe)

export default router
