import { Router } from "express"
import {
    getAllBookings,
    updateBookingStatus,
    getDashboardStats,
    getAllUsers,
    updateUser,
    deleteUser,
} from "../controllers/adminController"
import { authenticateToken, requireRole } from "../middleware/auth"
import { createBookingByManager } from "../controllers/bookingController"

const router = Router()

router.use(authenticateToken)
router.use(requireRole(["admin", "manager"]))

// GET /api/admin/bookings - получение всех бронирований
router.get("/bookings", getAllBookings)

// PATCH /api/admin/bookings/:id/status - обновление статуса бронирования
router.patch("/bookings/:id/status", updateBookingStatus)

// POST
router.post("/manager-create", createBookingByManager)

// GET
router.get("/users", getAllUsers)

// POST
router.post("/update-user/:id", updateUser)

// POST
router.post("/delete-user/:id", deleteUser)

// GET /api/admin/stats - получение статистики для дашборда
router.get("/stats", getDashboardStats)

export default router
