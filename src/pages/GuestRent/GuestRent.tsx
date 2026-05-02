import { useEffect, useState } from "react"
import "./GuestRent.css"
import GuestRentCard from "@/components/common/GuestRentCard/GuestRentCard"
import type { Booking } from "@/types/booking"
import { useNavigate } from "react-router-dom"

function GuestRents() {
    const navigate = useNavigate()
    const [signal, setSignal] = useState(true)
    const [rooms, setRooms] = useState<Booking[]>([])
    useEffect(() => {
        if (signal === true) {
            fetch(`${import.meta.env.VITE_API_URL}/bookings/my`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            })
                .then((data) => {
                    if (data.statusText === "Unauthorized") {
                        navigate("/profile")
                    }
                    data.json().then((value) => {
                        setRooms(value)
                    })
                    setSignal(false)
                })
                .catch((err) => {
                    console.log(err)
                    setSignal(false)
                })
        }
    }, [setRooms, navigate, signal, setSignal])

    return (
        <div className="guestRents">
            {rooms && rooms.map((value, index) => <GuestRentCard key={index} data={value} setSignal={setSignal} />)}
        </div>
    )
}

export default GuestRents
