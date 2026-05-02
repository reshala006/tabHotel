import { Response } from "express"
import { prisma } from "../utils/prisma"
import { AuthRequest } from "../middleware/auth"

export const getAllBookings = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const bookings = await prisma.booking.findMany({
            where: {
                status: {
                    in: ["confirmed", "checked_in"],
                },
            },
            include: {
                room: {
                    include: {
                        room_type: true,
                    },
                },
                guest: {
                    select: {
                        id: true,
                        email: true,
                        first_name: true,
                        last_name: true,
                        phone_number: true,
                    },
                },
            },
            orderBy: { created_at: "desc" },
        })

        const response = bookings.map((booking) => ({
            id: booking.id,
            status: booking.status,
            checkInDate: booking.check_in_date,
            checkOutDate: booking.check_out_date,
            totalPrice: Number(booking.total_price),
            room: {
                id: booking.room.id,
                number: booking.room.number,
                floor: booking.room.floor,
                status: booking.room.status,
                roomType: {
                    id: booking.room.room_type.id,
                    name: booking.room.room_type.name,
                    description: booking.room.room_type.description || "",
                    pricePerNight: Number(booking.room.room_type.price_per_night),
                    capacity: booking.room.room_type.capacity,
                },
            },
            guest: {
                id: booking.guest.id,
                email: booking.guest.email,
                firstName: booking.guest.first_name,
                lastName: booking.guest.last_name,
                phoneNumber: booking.guest.phone_number,
            },
            createdAt: booking.created_at,
        }))

        res.status(200).json(response)
    } catch (error) {
        console.error("Get all bookings error:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const updateBookingStatus = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const bookingId = parseInt(req.params.id)
        const { status } = req.body as { status: string }

        // const validStatuses = ["pending", "confirmed", "checked_in", "checked_out", "cancelled"]
        const validStatuses = ["confirmed", "checked_in", "checked_out", "cancelled"]

        if (!validStatuses.includes(status)) {
            res.status(400).json({ message: "Invalid status" })
            return
        }

        const booking = await prisma.booking.update({
            where: { id: bookingId },
            data: { status },
            include: {
                room: {
                    include: {
                        room_type: true,
                    },
                },
                guest: {
                    select: {
                        id: true,
                        email: true,
                        first_name: true,
                        last_name: true,
                    },
                },
            },
        })

        // if (status === "checked_in") {
        //     await prisma.room.update({
        //         where: { id: booking.room_id },
        //         data: { status: "occupied" },
        //     })
        // } else if (status === "checked_out" || status === "cancelled") {
        //     await prisma.room.update({
        //         where: { id: booking.room_id },
        //         data: { status: "available" },
        //     })
        // }

        if (status === "confirmed") {
            await prisma.room.update({
                where: { id: booking.room_id },
                data: { status: "available" },
            })
        }
        if (status === "checked_in") {
            await prisma.room.update({
                where: { id: booking.room_id },
                data: { status: "occupied" },
            })
        } else if (status === "cancelled") {
            await prisma.room.update({
                where: { id: booking.room_id },
                data: { status: "available" },
            })
        } else if (status === "checked_out") {
            await prisma.room.update({
                where: { id: booking.room_id },
                data: { status: "cleaning" },
            })
        }

        const response = {
            id: booking.id,
            status: booking.status,
            checkInDate: booking.check_in_date,
            checkOutDate: booking.check_out_date,
            totalPrice: Number(booking.total_price),
            guestData: booking.guest_data,
            room: {
                id: booking.room.id,
                number: booking.room.number,
                floor: booking.room.floor,
                status: booking.room.status,
                imageUrls: booking.room.image_urls,
                roomType: {
                    id: booking.room.room_type.id,
                    name: booking.room.room_type.name,
                    description: booking.room.room_type.description || "",
                    pricePerNight: Number(booking.room.room_type.price_per_night),
                    capacity: booking.room.room_type.capacity,
                    amenities: booking.room.room_type.amenities,
                    imageUrl: booking.room.room_type.image_url || undefined,
                },
                createdAt: booking.room.created_at,
            },
            guest: {
                id: booking.guest.id,
                email: booking.guest.email,
                firstName: booking.guest.first_name,
                lastName: booking.guest.last_name,
            },
            createdAt: booking.created_at,
        }

        res.status(200).json(response)
    } catch (error) {
        console.error("Update booking status error:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getDashboardStats = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const today = new Date()
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

        const totalRooms = await prisma.room.count()
        const availableRooms = await prisma.room.count({ where: { status: "available" } })
        const occupiedRooms = await prisma.room.count({ where: { status: "occupied" } })

        const totalBookings = await prisma.booking.count()
        const monthlyBookings = await prisma.booking.count({
            where: {
                created_at: {
                    gte: startOfMonth,
                    lte: endOfMonth,
                },
            },
        })

        const revenueResult = await prisma.booking.aggregate({
            where: {
                status: { in: ["confirmed", "checked_in", "checked_out"] },
            },
            _sum: {
                total_price: true,
            },
        })

        const monthlyRevenueResult = await prisma.booking.aggregate({
            where: {
                status: { in: ["confirmed", "checked_in", "checked_out"] },
                created_at: {
                    gte: startOfMonth,
                    lte: endOfMonth,
                },
            },
            _sum: {
                total_price: true,
            },
        })

        const stats = {
            rooms: {
                total: totalRooms,
                available: availableRooms,
                occupied: occupiedRooms,
            },
            bookings: {
                total: totalBookings,
                monthly: monthlyBookings,
            },
            revenue: {
                total: Number(revenueResult._sum.total_price) || 0,
                monthly: Number(monthlyRevenueResult._sum.total_price) || 0,
            },
        }

        res.status(200).json(stats)
    } catch (error) {
        console.error("Get dashboard stats error:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}
