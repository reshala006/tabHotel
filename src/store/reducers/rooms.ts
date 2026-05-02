import type { UnknownAction } from "redux"
import { type RoomsStateTypes, type RoomsAction, RoomsActionTypes, type Room } from "../types/rooms"

const roomsState: RoomsStateTypes = {
    rooms: null,
    loading: false,
    error: null,
}

export const roomsReducer = (state = roomsState, action: RoomsAction | UnknownAction): RoomsStateTypes => {
    switch (action.type) {
        case RoomsActionTypes.FETCH_ROOMS:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case RoomsActionTypes.FETCH_ROOMS_SUCCESS:
            return {
                ...state,
                rooms: action.payload as Record<number, Room>,
                loading: false,
                error: null,
            }
        case RoomsActionTypes.FETCH_ROOMS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload as string,
            }
        default:
            return state
    }
}
