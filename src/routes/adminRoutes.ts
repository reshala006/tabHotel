import { Router } from "express"
import { getAllBookings, updateBookingStatus, getDashboardStats } from "../controllers/adminController"
import { authenticateToken, requireRole } from "../middleware/auth"

const router = Router()

// Все роуты требуют аутентификации и роли admin/manager
router.use(authenticateToken)
router.use(requireRole(["admin", "manager"]))

// GET /api/admin/bookings - получение всех бронирований
router.get("/bookings", getAllBookings)

// PATCH /api/admin/bookings/:id/status - обновление статуса бронирования
router.patch("/bookings/:id/status", updateBookingStatus)

// GET /api/admin/stats - получение статистики для дашборда
router.get("/stats", getDashboardStats)

export default router
