import { Router } from "express"
import { createBooking, deleteUserBooking, getUserBookings } from "../controllers/bookingController"
import { authenticateToken } from "../middleware/auth"
import { validate } from "../middleware/validation"
import { bookingCreateSchema } from "../middleware/bookingValidation"

const router = Router()

// POST /api/bookings - создание нового бронирования
router.post("/create", authenticateToken, validate(bookingCreateSchema), createBooking)

// GET /api/bookings/my - получение бронирований текущего пользователя
router.get("/my", authenticateToken, getUserBookings)

router.delete("/delete", authenticateToken, deleteUserBooking)

export default router
