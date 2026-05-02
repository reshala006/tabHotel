export enum staffBookingsActionTypes {
    FETCH_BOOKINGS = "FETCH_BOOKINGS",
    FETCH_BOOKINGS_SUCCESS = "FETCH_BOOKINGS_SUCCESS",
    FETCH_BOOKINGS_ERROR = "FETCH_BOOKINGS_ERROR",
}

export interface Booking {
    id: number
    status: string

    checkInDate: string
    checkOutDate: string

    totalPrice: number

    room: {
        id: number
        number: number
        floor: number
        status: string

        roomType: {
            id: number
            name: string
            description: string
            pricePerNight: number
            capacity: number
        }
    }

    guest: {
        id: number
        email: string
        firstName: string
        lastName: string
        phoneNumber: string
    }

    createdAt: string
}

export interface staffBookingsStateTypes {
    bookings: Booking[] | null
    loading: boolean
    error: string | null
}

interface FetchStaffBookingsAction {
    type: staffBookingsActionTypes.FETCH_BOOKINGS
}
interface FetchStaffBookingsSuccessAction {
    type: staffBookingsActionTypes.FETCH_BOOKINGS_SUCCESS
    payload: Booking[] | null
}
interface FetchStaffBookingsErrorAction {
    type: staffBookingsActionTypes.FETCH_BOOKINGS_ERROR
    payload: string
}

export type StaffBookingsAction =
    | FetchStaffBookingsAction
    | FetchStaffBookingsSuccessAction
    | FetchStaffBookingsErrorAction
