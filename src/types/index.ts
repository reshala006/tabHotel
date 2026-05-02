export type Filters = {
    checkInDate: string
    checkOutDate: string
    roomTypeId?: number
    capacity?: number
    priceFrom: number
    priceTo: number
}

export type Guest = {
    id: number
    email: string
    firstName: string
    lastName: string
}

export type StaffRentFilters = {
    dateFrom: string
    dateTo: string
    name: string
    email: string
    tel: string
}

export type CleaningRoom = {
    roomId: number
    roomNumber: number
    floor: number
    roomType: string
    status: string
    notes: string
    cleaningStatus: string
}

export type CleaningFiltersType = {
    number: number
    floor: number
}
