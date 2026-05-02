import type { UnknownAction } from "redux"
import {
    RoomsAvailableActionTypes,
    type RoomsAvailableAction,
    type RoomsAvailableStateTypes,
} from "../types/roomsAvailable"

const roomsAvailableState: RoomsAvailableStateTypes = {
    roomsAvailable: null,
    loading: false,
    error: null,
}

export const roomsAvailableReducer = (
    state = roomsAvailableState,
    action: RoomsAvailableAction | UnknownAction,
): RoomsAvailableStateTypes => {
    switch (action.type) {
        case RoomsAvailableActionTypes.FETCH_ROOMS_AVAILABLE:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case RoomsAvailableActionTypes.FETCH_ROOMS_AVAILABLE_SUCCESS:
            return {
                ...state,
                roomsAvailable: action.payload as number[],
                loading: false,
                error: null,
            }
        case RoomsAvailableActionTypes.FETCH_ROOMS_AVAILABLE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload as string,
            }
        default:
            return state
    }
}
