import { useEffect, useRef } from "react"
import "./Profile.css"
import TabList from "@/components/common/TabList/TabList"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/hooks/useTypedRedux"
import { fetchUser } from "@/store/action/user"
import { UserActionTypes } from "@/store/types/user"
import LoginBtn from "@/components/ui/LoginBtn/LoginBtn"

interface KeyValue {
    key: string
    value: string
}

function Profile() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { user, error, loading } = useAppSelector((state) => state.user)
    const hasFetched = useRef(false)

    useEffect(() => {
        if (!hasFetched.current && !user && !loading) {
            dispatch(fetchUser())
            hasFetched.current = true
        }
    }, [dispatch, user, loading])

    const userData: KeyValue[] | undefined = user
        ? [
              { key: "почта", value: user.email },
              { key: "имя", value: user.firstName },
              { key: "фамилия", value: user.lastName },
              { key: "телефон", value: user.phone },
          ]
        : undefined

    const handleLogout = async () => {
        const API_URL = import.meta.env.VITE_API_URL
        if (!API_URL) throw new Error("API_URL is not defined")

        try {
            const response = await fetch(API_URL + "/auth/logout", {
                credentials: "include",
                method: "POST",
            })

            if (response.ok) {
                dispatch({ type: UserActionTypes.FETCH_USER_CLEAR_DATA })
                navigate("/")
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleLoginBtn = () => {
        navigate("/login")
        hasFetched.current = false
    }

    return (
        <div className="profile">
            {error && <LoginBtn handleClick={handleLoginBtn} />}
            {userData && (
                <>
                    <TabList title="профиль" list={userData} />
                    <button onClick={handleLogout} className="profile__logOutBtn">
                        logOut
                    </button>
                </>
            )}
        </div>
    )
}

export default Profile
