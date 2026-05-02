import type { Dispatch } from "redux"
import { RoomsAvailableActionTypes } from "../types/roomsAvailable"
import type { Filters } from "@/types"

export const fetchRoomsAvailable = (filters: Filters) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: RoomsAvailableActionTypes.FETCH_ROOMS_AVAILABLE })
            const modFilters = {
                ...filters,
                roomTypeId: 0,
            }
            const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms/availability`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(modFilters),
            })
            let data: number[] = await response.json()
            data = [...new Set(data.sort((a, b) => a - b))]
            dispatch({ type: RoomsAvailableActionTypes.FETCH_ROOMS_AVAILABLE_SUCCESS, payload: data })
        } catch (error) {
            dispatch({ type: RoomsAvailableActionTypes.FETCH_ROOMS_AVAILABLE_ERROR, payload: error })
        }
    }
}
