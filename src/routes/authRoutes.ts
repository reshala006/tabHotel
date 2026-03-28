import { Router } from "express"
import { register, login, getMe, logout } from "../controllers/authController"
import { validate, registerSchema, loginSchema } from "../middleware/validation"
import { authenticateToken } from "../middleware/auth"

const router = Router()

router.post("/register", validate(registerSchema), register)

router.post("/login", validate(loginSchema), login)

router.post("/logout", logout)

router.get("/me", authenticateToken, getMe)

export default router
