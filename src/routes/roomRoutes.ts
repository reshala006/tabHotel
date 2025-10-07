import { Router } from "express"
import { getAllRooms, checkAvailability } from "../controllers/roomController"
import { authenticateToken } from "../middleware/auth"

const router = Router()

// GET /api/rooms - получение всех номеров
router.get("/", authenticateToken, getAllRooms)

// POST /api/rooms/availability - проверка доступности номеров
router.post("/availability", authenticateToken, checkAvailability)

export default router
