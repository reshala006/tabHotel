import { Router } from "express"
import { uploadRoomImage, getRoomImage, deleteRoomImage } from "../controllers/uploadController"
import { authenticateToken, requireRole } from "../middleware/auth"
import { upload } from "../middleware/upload"

const router = Router()

router.post(
    "/rooms/:roomId",
    authenticateToken,
    requireRole(["admin", "manager"]),
    upload.array("photos", 3),
    uploadRoomImage
)

router.get("/rooms/images/:roomType/:filename", getRoomImage)

router.delete("/rooms/:roomId/images", authenticateToken, requireRole(["admin", "manager"]), deleteRoomImage)

export default router
