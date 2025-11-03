import { Router } from "express"
import { getCleaningTasks, updateCleaningStatus, getCleaningHistory } from "../controllers/maidController"
import { authenticateToken, requireRole } from "../middleware/auth"

const router = Router()

router.use(authenticateToken)
router.use(requireRole(["maid", "admin", "manager"]))

// GET /api/maid/tasks - получение списка номеров для уборки
router.get("/tasks", getCleaningTasks)

// PATCH /api/maid/rooms/:roomId/cleaning - обновление статуса уборки
router.patch("/rooms/:roomId/cleaning", updateCleaningStatus)

// GET /api/maid/history - получение истории уборок
router.get("/history", getCleaningHistory)

export default router
