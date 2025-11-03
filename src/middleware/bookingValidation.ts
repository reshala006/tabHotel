import { z } from "zod"

export const bookingCreateSchema = z
    .object({
        roomId: z.number().int().positive("Room ID must be positive"),
        checkInDate: z.string().refine((date) => {
            const checkIn = new Date(date)
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            return checkIn >= today
        }, "Check-in date cannot be in the past"),
        checkOutDate: z.string(),
        guestData: z
            .object({
                firstName: z.string().min(1, "First name is required"),
                lastName: z.string().min(1, "Last name is required"),
                email: z.string().email("Invalid email format"),
                phoneNumber: z.string().optional(),
            })
            .optional(),
    })
    .refine((data) => {
        const checkIn = new Date(data.checkInDate)
        const checkOut = new Date(data.checkOutDate)
        return checkOut > checkIn
    }, "Check-out date must be after check-in date")

export const bookingStatusSchema = z.object({
    status: z.enum(["pending", "confirmed", "checked_in", "checked_out", "cancelled"]),
})
