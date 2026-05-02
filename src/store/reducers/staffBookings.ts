import type { UnknownAction } from "redux"
import {
    staffBookingsActionTypes,
    type Booking,
    type StaffBookingsAction,
    type staffBookingsStateTypes,
} from "../types/staffBookings"

const staffBookingsState: staffBookingsStateTypes = {
    bookings: null,
    loading: false,
    error: null,
}

export const staffBookingsReducer = (
    state = staffBookingsState,
    action: StaffBookingsAction | UnknownAction,
): staffBookingsStateTypes => {
    switch (action.type) {
        case staffBookingsActionTypes.FETCH_BOOKINGS:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case staffBookingsActionTypes.FETCH_BOOKINGS_SUCCESS:
            return {
                ...state,
                bookings: action.payload as Booking[],
                loading: false,
                error: null,
            }
        case staffBookingsActionTypes.FETCH_BOOKINGS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload as string,
            }
        default:
            return state
    }
}
