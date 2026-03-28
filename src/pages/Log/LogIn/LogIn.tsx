import "../Log.css"
import { Link, useNavigate } from "react-router-dom"
import { useForm, type SubmitHandler, type SubmitErrorHandler } from "react-hook-form"
import { useAppDispatch } from "@/hooks/useTypedRedux"
import { fetchUser } from "@/store/action/user"

type FormValues = {
    email: string
    password: string
}

function Login() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<FormValues>()
    const onSubmit: SubmitHandler<FormValues> = (data) => logInPost(data)
    const onError: SubmitErrorHandler<FormValues> = (errors) => console.log(errors)

    async function logInPost({ email, password }: FormValues) {
        const API_URL: string | undefined = import.meta.env.VITE_API_URL
        try {
            const response = await fetch(API_URL + "/auth/login", {
                credentials: "include",
                method: "post",
                body: JSON.stringify({ email: email, password: password }),
                headers: {
                    "content-type": "application/json",
                },
            })

            if (response.status === 200) {
                const userData = await response.json()
                dispatch(fetchUser())

                if (
                    userData.user.role === "admin" ||
                    userData.user.role === "manager" ||
                    userData.user.role === "maid"
                ) {
                    // navigate("/staf")
                    navigate("/")
                } else {
                    navigate("/")
                }
            } else {
                alert("неправильный пароль или логин")
            }
        } catch (error) {
            alert("error")
            console.error("Error:", error)
        }
    }

    return (
        <div className="log">
            <div className="log__wrapper">
                <div className="log__wrapper__title">
                    <h1>login</h1>
                </div>
                <form className="log__wrapper__form" onSubmit={handleSubmit(onSubmit, onError)}>
                    <input type="text" placeholder="email" {...register("email", { required: true })} />
                    <input type="password" placeholder="password" {...register("password", { required: true })} />
                    <div className="log__wrapper__form__buttons">
                        <input type="submit" value="login" />
                        <Link to="/logup">logup</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
