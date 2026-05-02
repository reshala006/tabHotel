import "./index.css"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from "./pages/Main/Main.tsx"
import LogUp from "./pages/Log/LogUp/LogUp.tsx"
import LogIn from "./pages/Log/LogIn/LogIn.tsx"
import NavBarLayout from "./pages/NavBarLayout/MainLayout.tsx"
import Profile from "./pages/Profile/Profile.tsx"
import { Provider } from "react-redux"
import { store } from "./store/store.ts"
import Rooms from "./pages/Rooms/Rooms.tsx"
import Room from "./pages/Room/Room.tsx"
import GuestRents from "./pages/GuestRent/GuestRent.tsx"
import { NotificationProvider } from "./components/common/NotificationProvider/NotificationProvider.tsx"
import Stats from "./pages/Admin/Stats/Stats.tsx"
import StaffRent from "./pages/Staff/StaffRent/StaffRent.tsx"
import Cleaning from "./pages/Maid/Cleaning/Cleaning.tsx"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <NotificationProvider>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<NavBarLayout />}>
                            <Route path="/" element={<Main />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/rooms" element={<Rooms />} />
                            <Route path="/rooms/:id" element={<Room />} />
                            <Route path="/guest-rent" element={<GuestRents />} />

                            <Route path="/admin/stats" element={<Stats />} />
                            <Route path="/staff/staff-rent" element={<StaffRent />} />
                            <Route path="/maid/cleaning" element={<Cleaning />} />
                        </Route>
                        <Route path="/logup" element={<LogUp />} />
                        <Route path="/login" element={<LogIn />} />
                    </Routes>
                </BrowserRouter>
            </Provider>
        </NotificationProvider>
    </StrictMode>,
)
