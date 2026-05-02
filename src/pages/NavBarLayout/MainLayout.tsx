import NavBar from "@/components/common/NavBar/NavBar"
import { useAppDispatch, useAppSelector } from "@/hooks/useTypedRedux"
import { fetchUser } from "@/store/action/user"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"

function NavBarLayout() {
    const userRole = useAppSelector((state) => state.user.user?.role)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch])

    return (
        <>
            <NavBar post={userRole ? userRole : "guest"} />
            <Outlet />
        </>
    )
}

export default NavBarLayout
