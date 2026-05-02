import { Router } from "express"
import { getAllRooms, checkAvailability } from "../controllers/roomController"
// import { authenticateToken } from "../middleware/auth"

const router = Router()

// GET /api/rooms
// router.get("/", authenticateToken, getAllRooms)
router.get("/", getAllRooms)

// POST /api/rooms/availability
// router.post("/availability", authenticateToken, checkAvailability)
router.post("/availability", checkAvailability)

export default router
