export enum RoomsActionTypes {
    FETCH_ROOMS = "FETCH_ROOMS",
    FETCH_ROOMS_SUCCESS = "FETCH_ROOMS_SUCCESS",
    FETCH_ROOMS_ERROR = "FETCH_ROOMS_ERROR",
}

export interface RoomType {
    id: number
    name: string
    description: string
    pricePerNight: number
    capacity: number
    amenities: string[]
    imageUrl?: string
}

export interface Room {
    id: number
    floor: number
    number: number
    roomType: RoomType
    imageUrls: string[]
}

export interface RoomsStateTypes {
    rooms: Record<number, Room> | null
    loading: boolean
    error: null | string
}

interface FetchRoomsAction {
    type: RoomsActionTypes.FETCH_ROOMS
}

interface FetchRoomsSuccessAction {
    type: RoomsActionTypes.FETCH_ROOMS_SUCCESS
    payload: Record<number, Room> | unknown
}

interface FetchRoomsErrorAction {
    type: RoomsActionTypes.FETCH_ROOMS_ERROR
    payload: string | unknown
}

export type RoomsAction = FetchRoomsAction | FetchRoomsSuccessAction | FetchRoomsErrorAction
