import { Router } from "express"
import { getAllRooms, checkAvailability } from "../controllers/roomController"
import { authenticateToken } from "../middleware/auth"

const router = Router()

// GET /api/rooms
router.get("/", authenticateToken, getAllRooms)

// POST /api/rooms/availability
router.post("/availability", authenticateToken, checkAvailability)

export default router
