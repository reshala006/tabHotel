import multer from "multer"
import path from "path"
import { Request } from "express"
import fs from "fs"

// Настройка хранилища для Multer
const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        const roomId = req.params.roomId
        const roomFolder = `uploads/rooms/${roomId}`

        if (!fs.existsSync(roomFolder)) {
            fs.mkdirSync(roomFolder, { recursive: true })
        }

        cb(null, roomFolder)
    },
    filename: (req: Request, file, cb) => {
        cb(null, file.originalname)
    },
})

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = /jpeg|jpg|png|webp/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)

    if (mimetype && extname) {
        return cb(null, true)
    } else {
        cb(new Error("Only images are allowed"))
    }
}

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: fileFilter,
})
