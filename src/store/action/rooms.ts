import { RoomsActionTypes, type Room } from "../types/rooms"
import type { Dispatch } from "redux"

export const fetchRooms = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: RoomsActionTypes.FETCH_ROOMS })
            const response = await fetch(import.meta.env.VITE_API_URL + "/rooms/", { credentials: "include" })

            const data = await response.json()

            if (!data.length) {
                dispatch({ type: RoomsActionTypes.FETCH_ROOMS_ERROR, payload: "Erorr" })
            } else {
                const rooms: Record<number, Room> = data.reduce((acc: Record<number, Room>, item: Room) => {
                    acc[item.roomType.id] = item
                    return acc
                })
                dispatch({ type: RoomsActionTypes.FETCH_ROOMS_SUCCESS, payload: rooms })
            }
        } catch {
            dispatch({ type: RoomsActionTypes.FETCH_ROOMS_ERROR, payload: "Erorr" })
        }
    }
}
