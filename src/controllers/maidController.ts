import { Response } from "express"
import { prisma } from "../utils/prisma"
import { AuthRequest } from "../middleware/auth"

export const getCleaningTasks = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const rooms = await prisma.room.findMany({
            where: {
                status: "cleaning",
            },
            include: {
                room_type: {
                    select: {
                        name: true,
                    },
                },
                cleaning_logs: {
                    where: {
                        date: today,
                    },
                    take: 1,
                    orderBy: {
                        created_at: "desc",
                    },
                },
            },
            orderBy: [{ status: "asc" }, { number: "asc" }],
        })

        const tasks = rooms.map((room) => {
            const latestLog = room.cleaning_logs[0]

            return {
                roomId: room.id,
                roomNumber: room.number,
                floor: room.floor,
                roomType: room.room_type.name,
                status: room.status,
                cleaningStatus: latestLog?.status || "dirty",
                lastCleaned: latestLog?.created_at,
                notes: latestLog?.notes,
            }
        })

        res.status(200).json(tasks)
    } catch (error) {
        console.error("Get cleaning tasks error:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

// Обновление статуса уборки номера
export const updateCleaningStatus = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const maidId = req.user?.id
        const roomId = parseInt(req.params.roomId)
        const { status, notes } = req.body as { status: string; notes?: string }

        if (!maidId) {
            res.status(401).json({ message: "Not authenticated" })
            return
        }

        const validStatuses = ["clean", "dirty", "in_progress"]
        if (!validStatuses.includes(status)) {
            res.status(400).json({ message: "Invalid cleaning status" })
            return
        }

        // Создаем или обновляем запись в журнале уборки
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const cleaningLog = await prisma.cleaningLog.upsert({
            where: {
                cleaning_log_room_date: {
                    room_id: roomId,
                    date: today,
                },
            },
            update: {
                status,
                notes,
                maid_id: maidId,
            },
            create: {
                room_id: roomId,
                maid_id: maidId,
                date: today,
                status,
                notes,
            },
            include: {
                room: {
                    include: {
                        room_type: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        })

        // Обновляем статус комнаты если уборка завершена
        if (status === "clean") {
            await prisma.room.update({
                where: { id: roomId },
                data: { status: "available" },
            })
        }

        const response = {
            id: cleaningLog?.id,
            roomId: cleaningLog?.room_id,
            roomNumber: cleaningLog?.room.number,
            floor: cleaningLog?.room.floor,
            roomType: cleaningLog?.room.room_type.name,
            status: cleaningLog?.status,
            notes: cleaningLog?.notes,
            date: cleaningLog?.date,
            updatedAt: cleaningLog?.created_at,
        }

        res.status(200).json(response)
    } catch (error) {
        console.error("Update cleaning status error:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

// Получение истории уборок для горничной
export const getCleaningHistory = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const maidId = req.user?.id

        if (!maidId) {
            res.status(401).json({ message: "Not authenticated" })
            return
        }

        const history = await prisma.cleaningLog.findMany({
            where: {
                maid_id: maidId,
            },
            include: {
                room: {
                    include: {
                        room_type: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                created_at: "desc",
            },
            take: 50, // Последние 50 записей
        })

        const response = history.map((log) => ({
            id: log.id,
            roomId: log.room_id,
            roomNumber: log.room.number,
            floor: log.room.floor,
            roomType: log.room.room_type.name,
            status: log.status,
            notes: log.notes,
            date: log.date,
            cleanedAt: log.created_at,
        }))

        res.status(200).json(response)
    } catch (error) {
        console.error("Get cleaning history error:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}
