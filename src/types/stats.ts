type Rooms = {
    total: number
    available: number
    occupied: number
}
type Bookings = {
    total: number
    monthly: number
}
type Revenue = {
    total: number
    monthly: number
}

type StatsType = {
    rooms: Rooms
    bookings: Bookings
    revenue: Revenue
}

export type { StatsType }
