export interface RoomType {
    id: number
    name: string
    description: string
    pricePerNight: number
    capacity: number
    amenities: string[]
    imageUrl?: string
}

export interface Room {
    id: number
    floor: number
    number: number
    roomType: RoomType
    imageUrls: string[]
}
