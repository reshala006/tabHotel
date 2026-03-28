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

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route element={<NavBarLayout />}>
                        <Route path="/" element={<Main />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route path="/logup" element={<LogUp />} />
                    <Route path="/login" element={<LogIn />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    </StrictMode>,
)
