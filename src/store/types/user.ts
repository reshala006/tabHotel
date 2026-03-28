export enum UserActionTypes {
    FETCH_USER = "FETCH_USER",
    FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS",
    FETCH_USER_ERROR = "FETCH_USER_ERROR",
    FETCH_USER_ERROR_CLEAR = "FETCH_USER_ERROR_CLEAR",
    FETCH_USER_CLEAR_DATA = "FETCH_USER_CLEAR_DATA",
}

export interface User {
    email: string
    firstName: string
    lastName: string
    phone: string
    role: string
}

export interface UserStateTypes {
    user: User | null
    loading: boolean
    error: null | string
}

interface FetchUserAction {
    type: UserActionTypes.FETCH_USER
}

interface FetchUserSuccessAction {
    type: UserActionTypes.FETCH_USER_SUCCESS
    payload: User | unknown
}

interface FetchUserErrorAction {
    type: UserActionTypes.FETCH_USER_ERROR
    payload: string | unknown
}

interface FetchUserClearData {
    type: UserActionTypes.FETCH_USER_CLEAR_DATA
}

export type UserAction = FetchUserAction | FetchUserSuccessAction | FetchUserErrorAction | FetchUserClearData
