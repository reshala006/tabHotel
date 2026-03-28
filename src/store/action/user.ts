import { UserActionTypes } from "../types/user"
import type { Dispatch } from "redux"

export const fetchUser = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: UserActionTypes.FETCH_USER })
            const response = await fetch(import.meta.env.VITE_API_URL + "/auth/me", {
                credentials: "include",
            })
            const data = await response.json()
            if (!data.email) {
                dispatch({ type: UserActionTypes.FETCH_USER_ERROR, payload: "Token not access" })
            } else {
                const user = {
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phone: data.phoneNumber,
                    role: data.role,
                }

                dispatch({ type: UserActionTypes.FETCH_USER_SUCCESS, payload: user })
            }
        } catch {
            dispatch({
                type: UserActionTypes.FETCH_USER_ERROR,
                payload: "error",
            })
        }
    }
}
