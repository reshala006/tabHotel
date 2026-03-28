import NavBar from "@/components/common/NavBar/NavBar"
import type posts from "@/constants/posts"
import { useAppSelector } from "@/hooks/useTypedRedux"
import { Outlet } from "react-router-dom"

function NavBarLayout() {
    const userRole = useAppSelector((state) => state.user.user?.role)

    const getNavBarPost = (role?: string): keyof typeof posts => {
        if (role === undefined) {
            return "guest"
        }
        return role
    }

    return (
        <>
            <NavBar post={getNavBarPost(userRole)} />
            <Outlet />
        </>
    )
}

export default NavBarLayout
