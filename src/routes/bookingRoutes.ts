import { Router } from "express"
import { createBooking, getUserBookings } from "../controllers/bookingController"
import { authenticateToken } from "../middleware/auth"

const router = Router()

// POST /api/bookings
router.post("/", authenticateToken, createBooking)

// GET /api/bookings/my
router.get("/my", authenticateToken, getUserBookings)

export default router
