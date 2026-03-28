import type { UnknownAction } from "redux"
import { type UserStateTypes, UserActionTypes, type UserAction, type User } from "../types/user"

const userState: UserStateTypes = {
    user: null,
    loading: false,
    error: null,
}

export const userReducer = (state = userState, action: UserAction | UnknownAction): UserStateTypes => {
    switch (action.type) {
        case UserActionTypes.FETCH_USER:
            return {
                ...state,
                loading: true,
                error: null,
            }

        case UserActionTypes.FETCH_USER_SUCCESS:
            return {
                ...state,
                user: action.payload as User,
                loading: false,
                error: null,
            }

        case UserActionTypes.FETCH_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload as string,
            }

        case UserActionTypes.FETCH_USER_CLEAR_DATA:
            return {
                ...state,
                user: null,
            }
        default:
            return state
    }
}
