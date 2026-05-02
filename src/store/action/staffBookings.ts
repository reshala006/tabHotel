import type { Dispatch } from "redux"
import { RoomsAvailableActionTypes } from "../types/roomsAvailable"
import { staffBookingsActionTypes } from "../types/staffBookings"

export const fetchStaffBookings = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: staffBookingsActionTypes.FETCH_BOOKINGS })
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/bookings`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            })
            if (response.status === 200) {
                const data = await response.json()
                dispatch({ type: staffBookingsActionTypes.FETCH_BOOKINGS_SUCCESS, payload: data })
            } else {
                dispatch({ type: staffBookingsActionTypes.FETCH_BOOKINGS_ERROR, payload: "error" })
            }
        } catch (error) {
            dispatch({ type: RoomsAvailableActionTypes.FETCH_ROOMS_AVAILABLE_ERROR, payload: error })
        }
    }
}
