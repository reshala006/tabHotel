export enum RoomsAvailableActionTypes {
    FETCH_ROOMS_AVAILABLE = "FETCH_ROOMS_AVAILABLE",
    FETCH_ROOMS_AVAILABLE_SUCCESS = "FETCH_ROOMS_AVAILABLE_SUCCESS",
    FETCH_ROOMS_AVAILABLE_ERROR = "FETCH_ROOMS_AVAILABLE_ERROR",
}

export interface RoomsAvailableStateTypes {
    roomsAvailable: number[] | null
    loading: boolean
    error: null | string
}

interface FetchRoomsAvailableAction {
    type: RoomsAvailableActionTypes.FETCH_ROOMS_AVAILABLE
}
interface FetchRoomsAvailableSuccessAction {
    type: RoomsAvailableActionTypes.FETCH_ROOMS_AVAILABLE_SUCCESS
    payload: number[]
}
interface FetchRoomsAvailableErrorAction {
    type: RoomsAvailableActionTypes.FETCH_ROOMS_AVAILABLE_ERROR
    payload: string
}

export type RoomsAvailableAction =
    | FetchRoomsAvailableAction
    | FetchRoomsAvailableSuccessAction
    | FetchRoomsAvailableErrorAction
