import { Response } from "express"
import { prisma } from "../utils/prisma"
import { AuthRequest } from "../middleware/auth"
import { RoomUpdateRequest, RoomResponse, AvailabilityCheckRequest } from "../types"

export const getAllRooms = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const rooms = await prisma.room.findMany({
            include: {
                room_type: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        price_per_night: true,
                        capacity: true,
                        amenities: true,
                        image_url: true,
                    },
                },
            },
            orderBy: { number: "asc" },
        })

        const response: RoomResponse[] = rooms.map((room) => ({
            id: room.id,
            number: room.number,
            floor: room.floor,
            status: room.status,
            imageUrls: room.image_urls || [],
            roomType: {
                id: room.room_type.id,
                name: room.room_type.name,
                description: room.room_type.description || "",
                pricePerNight: Number(room.room_type.price_per_night),
                capacity: room.room_type.capacity,
                amenities: room.room_type.amenities,
                imageUrl: room.room_type.image_url || undefined,
            },
            createdAt: room.created_at,
        }))

        res.status(200).json(response)
    } catch (error) {
        console.error("Get rooms error:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const checkAvailability = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { checkInDate, checkOutDate, roomTypeId, priceFrom, priceTo }: AvailabilityCheckRequest = req.body

        const checkIn = new Date(checkInDate)
        const checkOut = new Date(checkOutDate)

        const availableRooms = await prisma.room.findMany({
            where: {
                ...(roomTypeId && { room_type_id: roomTypeId }),
                status: "available",
                ...((priceFrom !== undefined || priceTo !== undefined) && {
                    room_type: {
                        price_per_night: {
                            ...(priceFrom !== undefined && { gte: priceFrom }),
                            ...(priceTo !== undefined && { lte: priceTo }),
                        },
                    },
                }),
                bookings: {
                    none: {
                        check_in_date: { lt: checkOut },
                        check_out_date: { gt: checkIn },
                    },
                },
            },
            include: {
                room_type: {
                    select: {
                        id: true,
                    },
                },
            },
        })

        const response: number[] = availableRooms.map((rooms) => rooms.room_type.id)
        console.log(response)

        res.status(200).json(response)
    } catch (error) {
        console.error("Check availability error:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}
