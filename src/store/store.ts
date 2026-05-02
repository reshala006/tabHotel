import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "./reducers/user"
import { roomsReducer } from "./reducers/rooms"
import { roomsAvailableReducer } from "./reducers/roomsAvailable"
import { staffBookingsReducer } from "./reducers/staffBookings"

export const store = configureStore({
    reducer: {
        user: userReducer,
        rooms: roomsReducer,
        roomsAvailable: roomsAvailableReducer,
        staffBookings: staffBookingsReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
