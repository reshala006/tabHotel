export interface RegisterRequest {
    email: string
    password: string
    firstName: string
    lastName: string
    phoneNumber?: string
    role: string // 'guest', 'admin', 'maid', 'manager'
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

// Типы для номеров
export interface RoomCreateRequest {
    number: string
    floor: number
    roomTypeId: number
    status?: string
}

export interface RoomUpdateRequest {
    number?: string
    floor?: number
    roomTypeId?: number
    status?: string
}

export interface RoomResponse {
    id: number
    number: string
    floor: number
    status: string
    roomType: RoomTypeResponse
    createdAt: Date
}

export interface RoomTypeResponse {
    id: number
    name: string
    description: string
    pricePerNight: number
    capacity: number
    amenities: string[]
    imageUrl?: string
}

// Типы для бронирований
export interface BookingCreateRequest {
    roomId: number
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

export interface AvailabilityCheckRequest {
    checkInDate: string
    checkOutDate: string
    roomTypeId?: number
}
