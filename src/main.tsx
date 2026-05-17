import "./index.css"
import { StrictMode, lazy, Suspense } from "react"
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
import { LoadingFallback } from "./components/common/LoadingFallback/LoadingFallback.tsx"

const Stats = lazy(() => import("./pages/Admin/Stats/Stats.tsx"))
const StaffRent = lazy(() => import("./pages/Staff/StaffRent/StaffRent.tsx"))
const Cleaning = lazy(() => import("./pages/Maid/Cleaning/Cleaning.tsx"))
const StaffBookins = lazy(() => import("./pages/Staff/StaffBookings/StaffBookings.tsx"))
const UsersPage = lazy(() => import("./pages/Admin/UsersPage/UsersPage.tsx"))

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

                            <Route
                                path="/admin/stats"
                                element={
                                    <Suspense fallback={<LoadingFallback />}>
                                        <Stats />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="/staff/staff-rent"
                                element={
                                    <Suspense fallback={<LoadingFallback />}>
                                        <StaffRent />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="/maid/cleaning"
                                element={
                                    <Suspense fallback={<LoadingFallback />}>
                                        <Cleaning />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="/admin/create-bookings"
                                element={
                                    <Suspense fallback={<LoadingFallback />}>
                                        <StaffBookins />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="/admin/users"
                                element={
                                    <Suspense fallback={<LoadingFallback />}>
                                        <UsersPage />
                                    </Suspense>
                                }
                            />
                        </Route>
                        <Route path="/logup" element={<LogUp />} />
                        <Route path="/login" element={<LogIn />} />
                    </Routes>
                </BrowserRouter>
            </Provider>
        </NotificationProvider>
    </StrictMode>,
)
