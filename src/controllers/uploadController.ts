import { Response } from "express"
import { prisma } from "../utils/prisma"
import { AuthRequest } from "../middleware/auth"
import path from "path"
import fs from "fs"
import { object } from "zod"

interface UploadRequest extends AuthRequest {
    file?: Express.Multer.File
}

export const uploadRoomImage = async (req: UploadRequest, res: Response): Promise<void> => {
    try {
        console.log("Upload request received")
        console.log("Params:", req.params)

        const roomIdentifier = req.params.roomId
        console.log("Room identifier:", roomIdentifier)

        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
            console.log("No files in request")
            res.status(400).json({ message: "No files uploaded" })
            return
        }

        const files = req.files as Express.Multer.File[]

        const room = await prisma.room.findFirst({
            where: {
                number: roomIdentifier,
            },
            select: { id: true, number: true, image_urls: true, room_type: true },
        })

        console.log("Found room:", room)

        if (!room) {
            console.log("Room not found for room_type.name:", roomIdentifier)
            res.status(404).json({ message: "Room not found" })
            return
        }

        const currentUrls = room.image_urls || []
        const newImageUrls = [...currentUrls]

        files.forEach((file: Express.Multer.File) => {
            const imageUrl = `/uploads/rooms/${room.number}/${file.filename}`
            console.log("Image URL:", imageUrl)
            newImageUrls.push(imageUrl)
        })

        console.log("New image URLs:", newImageUrls)

        console.log("Updating room in database...")
        await prisma.room.update({
            where: { id: room.id },
            data: { image_urls: newImageUrls },
        })

        console.log("Room updated successfully")

        res.status(200).json({
            message: "Images uploaded successfully",
            uploadedCount: files.length,
            imageUrls: newImageUrls.slice(currentUrls.length),
            room: {
                id: room.id,
                number: room.number,
                room_type: room.room_type,
            },
        })
    } catch (error) {
        console.error("Upload error details:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getRoomImage = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { roomType, filename } = req.params as { roomType: string; filename: string }

        const roomTypes: Record<string, string> = {
            "economy-solo": "1",
            "economy-solo-x2": "4",
            "economy-duo": "7",

            "comfort-solo": "10",
            "comfort-solo-x2": "13",
            "comfort-duo": "16",

            "luxuary-solo": "19",
            "luxuary-solo-x2": "22",
            "luxuary-duo": "25",
        }

        const roomId = roomTypes[roomType] ?? roomType

        const imagePath = path.join(__dirname, "../../uploads/rooms", roomId, filename)

        console.log("Looking for image at:", imagePath)

        if (!fs.existsSync(imagePath)) {
            console.log("Image not found at path:", imagePath)
            res.status(404).json({ message: "Image not found" })
            return
        }

        res.sendFile(imagePath)
    } catch (error) {
        console.error("Get image error:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const deleteRoomImage = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const roomIdentifier = req.params.roomId
        const { imageUrl } = req.body as { imageUrl: string }

        if (!imageUrl) {
            res.status(400).json({ message: "imageUrl is required" })
            return
        }

        const currentRoom = await prisma.room.findFirst({
            where: {
                room_type: {
                    name: roomIdentifier,
                },
            },
            select: { id: true, image_urls: true, room_type: true },
        })

        if (!currentRoom) {
            res.status(404).json({ message: "Room not found" })
            return
        }

        const updatedImageUrls = currentRoom.image_urls.filter((url: string) => url !== imageUrl)

        await prisma.room.update({
            where: { id: currentRoom.id },
            data: { image_urls: updatedImageUrls },
        })

        try {
            const filename = imageUrl.split("/").pop()
            if (filename) {
                const filePath = path.join(__dirname, "../../uploads/rooms", roomIdentifier, filename)
                console.log("Deleting file at:", filePath)

                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath)
                    console.log("File deleted successfully")
                } else {
                    console.log("File not found at path:", filePath)
                }
            }
        } catch (fileError) {
            console.error("Error deleting file:", fileError)
        }

        res.status(200).json({
            message: "Image deleted successfully",
            remainingImages: updatedImageUrls,
        })
    } catch (error) {
        console.error("Delete image error:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}
