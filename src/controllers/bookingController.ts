import { Response } from "express"
import { prisma } from "../utils/prisma"
import { AuthRequest } from "../middleware/auth"
import { BookingCreateRequest, BookingDataRequest, BookingResponse, ManagerBookingCreateRequest } from "../types"

export const createBooking = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id
        const bookingData: BookingCreateRequest = req.body

        if (!userId) {
            res.status(401).json({ message: "Not authenticated" })
            return
        }

        let existingBookings: { room_id: number }[] | number[] = await prisma.booking.findMany({
            where: {
                room_type_id: bookingData.roomTypeId,
                AND: [
                    {
                        check_in_date: { lt: new Date(bookingData.checkOutDate) },
                        check_out_date: { gt: new Date(bookingData.checkInDate) },
                    },
                ],
                status: { in: ["confirmed", "checked_in"] },
            },
            select: { room_id: true },
        })

        existingBookings = existingBookings.map((booking) => booking.room_id)

        if (existingBookings.length === 3) {
            res.status(409).json({ message: "All room in not available for selected dates" })
            return
        }

        const rooms = await prisma.room.findMany({
            where: { room_type_id: bookingData.roomTypeId },
            select: { id: true },
        })

        const bookingsSet = new Set(existingBookings)
        let roomId
        for (let i of rooms) {
            if (!bookingsSet.has(i.id)) {
                roomId = i.id
                break
            }
        }

        const room = await prisma.room.findFirst({
            where: {
                id: roomId,
            },
            include: { room_type: true },
        })
        if (!room) {
            res.status(404).json({ message: "Room not found" })
            return
        }

        const checkIn = new Date(bookingData.checkInDate)
        const checkOut = new Date(bookingData.checkOutDate)
        const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
        const totalPrice = nights * Number(room.room_type.price_per_night)

        const booking = await prisma.booking.create({
            data: {
                guest_id: userId,
                room_id: room.id,
                room_type_id: bookingData.roomTypeId,
                check_in_date: checkIn,
                check_out_date: checkOut,
                total_price: totalPrice,
                guest_data: bookingData.guestData,
                status: "confirmed",
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
                    },
                },
            },
        })

        const response: BookingResponse = {
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

        res.status(201).json(response)
    } catch (error) {
        console.error("Create booking error:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getUserBookings = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id

        if (!userId) {
            res.status(401).json({ message: "Not authenticated" })
            return
        }

        const bookings = await prisma.booking.findMany({
            where: { guest_id: userId },
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
            orderBy: { created_at: "desc" },
        })

        const response: BookingResponse[] = bookings.map((booking) => ({
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
        }))

        res.status(200).json(response)
    } catch (error) {
        console.error("Get user bookings error:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const deleteUserBooking = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = req.user?.id
        const booking: BookingDataRequest | undefined = req.body

        if (!booking || !user) {
            res.status(400).json({ error: "data is required" })
            return
        } else if (user != booking.guestId) {
            res.status(400).json({ error: "You are daun?" })
            return
        }

        const deletedBooking = await prisma.booking.deleteMany({
            where: {
                room_id: booking.roomId,
            },
        })

        res.status(200).json({ message: "Booking deleted successfully", booking: deletedBooking })
    } catch (error: any) {
        console.error("Error deleting booking:", error)
        res.status(500).json({ error: "Failed to delete booking" })
    }
}

export const createBookingByManager = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const managerId = req.user?.id
        const managerRole = req.user?.role

        if (!managerId || managerRole !== "manager") {
            res.status(403).json({ message: "Access denied: managers only" })
            return
        }

        const body: ManagerBookingCreateRequest = req.body

        const checkIn = new Date(body.checkInDate)
        const checkOut = new Date(body.checkOutDate)

        if (checkOut <= checkIn) {
            res.status(400).json({ message: "checkOutDate must be after checkInDate" })
            return
        }

        let existingBookings: { room_id: number }[] | number[] = await prisma.booking.findMany({
            where: {
                room_type_id: body.roomTypeId,
                AND: [
                    {
                        check_in_date: { lt: checkOut },
                        check_out_date: { gt: checkIn },
                    },
                ],
                status: { in: ["confirmed", "checked_in"] },
            },
            select: { room_id: true },
        })

        existingBookings = existingBookings.map((b) => b.room_id)

        const rooms = await prisma.room.findMany({
            where: { room_type_id: body.roomTypeId },
            select: { id: true },
        })

        if (existingBookings.length >= rooms.length) {
            res.status(409).json({
                message: "No available rooms for the selected dates",
            })
            return
        }

        const takenSet = new Set(existingBookings)
        let roomId: number | undefined
        for (const r of rooms) {
            if (!takenSet.has(r.id)) {
                roomId = r.id
                break
            }
        }

        const room = await prisma.room.findFirst({
            where: { id: roomId },
            include: { room_type: true },
        })
        if (!room) {
            res.status(404).json({ message: "Room not found" })
            return
        }

        const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
        const totalPrice = nights * Number(room.room_type.price_per_night)

        const booking = await prisma.booking.create({
            data: {
                guest_id: managerId,
                room_id: room.id,
                room_type_id: body.roomTypeId,
                check_in_date: checkIn,
                check_out_date: checkOut,
                total_price: totalPrice,
                guest_data: body.guestData,
                status: "confirmed",
            },
            include: {
                room: { include: { room_type: true } },
                guest: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        phone_number: true,
                    },
                },
            },
        })

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
                firstName: booking.guest.first_name,
                lastName: booking.guest.last_name,
                phoneNumber: booking.guest.phone_number,
            },
            createdAt: booking.created_at,
        }

        res.status(201).json(response)
    } catch (error) {
        console.error("Manager create booking error:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}
