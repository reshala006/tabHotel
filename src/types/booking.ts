import type { Guest } from "."
import type { Room } from "./room"

export type Booking = {
    id: number
    status: string
    checkInDate: string
    checkOutDate: string
    totalPrice: number
    guestData: null
    room: Room
    guest: Guest
}
