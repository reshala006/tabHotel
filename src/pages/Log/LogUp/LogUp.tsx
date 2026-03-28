import { Link, useNavigate } from "react-router-dom"
import "../Log.css"
import { useForm, type SubmitHandler, type SubmitErrorHandler } from "react-hook-form"

type FormValues = {
    email: string
    password: string
    firstName: string
    lastName: string
    phone: number
}

async function logUpPost(
    { email, password, firstName, lastName, phone }: FormValues,
    navigate: (path: string) => void,
) {
    const API_URL: string | undefined = import.meta.env.VITE_API_URL
    try {
        await fetch(API_URL + "/auth/register", {
            credentials: "include",
            method: "post",
            body: JSON.stringify({
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phone,
                role: "guest",
                key: "",
            }),
            headers: {
                "content-type": "application/json",
            },
        }).then((data) => {
            console.log(data)
            if (data.status === 201) {
                navigate("/")
            } else {
                const errorMessage = data.json()
                errorMessage.then((data) => {
                    alert(data.message)
                })
            }
        })
    } catch (error) {
        alert("error")
        console.error("Error:", error)
    }
}

function LogUp() {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<FormValues>()
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data)
        logUpPost(data, navigate)
    }
    const onError: SubmitErrorHandler<FormValues> = (errors) => console.log(errors)

    return (
        <div className="log">
            <div className="log__wrapper">
                <div className="log__wrapper__title">
                    <h1>logup</h1>
                </div>
                <form className="log__wrapper__form" onSubmit={handleSubmit(onSubmit, onError)}>
                    <input type="text" placeholder="email" {...register("email", { required: true })} />
                    <input type="password" placeholder="password" {...register("password", { required: true })} />
                    <input type="text" placeholder="firstName" {...register("firstName", { required: true })} />
                    <input type="text" placeholder="lastName" {...register("lastName", { required: true })} />
                    <input type="tel" placeholder="phone" {...register("phone", { required: true })} />
                    <div className="log__wrapper__form__buttons">
                        <input type="submit" value="logup" />
                        <Link to="/login">login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LogUp
