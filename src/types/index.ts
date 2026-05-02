export interface RegisterRequest {
    email: string
    password: string
    firstName: string
    lastName: string
    phoneNumber?: string
    role?: string // 'guest', 'admin', 'maid', 'manager'
}

export interface LoginRequest {
    email: string
    password: string
}

export interface AuthResponse {
    user: {
        id: number
        email: string
        firstName: string
        lastName: string
        role: string
    }
    token: string
}

export interface RoomImage {
    url: string
    type: "main" | "bathroom" | "view" | "other"
    description?: string
    order: number
}

export interface RoomUpdateRequest {
    // number?: string
    number?: number
    floor?: number
    roomTypeId?: number
    status?: string
}

export interface RoomResponse {
    id: number
    // number: string
    number: number
    floor: number
    status: string
    imageUrls: string[]
    roomType: RoomTypeResponse
    createdAt: Date
}

export interface RoomTypeResponse {
    // id: number
    name: string
    description: string
    pricePerNight: number
    capacity: number
    amenities: string[]
    imageUrl?: string
}

// Типы для бронирований
export interface BookingDataRequest {
    roomId: number
    guestId: number
}
export interface BookingCreateRequest {
    roomTypeId: number
    checkInDate: string
    checkOutDate: string
    guestData?: {
        firstName: string
        lastName: string
        email: string
        phoneNumber?: string
    }
}

export interface BookingResponse {
    id: number
    status: string
    checkInDate: Date
    checkOutDate: Date
    totalPrice: number
    guestData: any
    room: RoomResponse
    guest: {
        id: number
        email: string
        firstName: string
        lastName: string
    }
    createdAt: Date
}

export interface BookingsResponse {
    bookings: BookingResponse[]
}

export interface AvailabilityCheckRequest {
    checkInDate: string
    checkOutDate: string
    roomTypeId?: number
    priceFrom?: number
    priceTo?: number
}
