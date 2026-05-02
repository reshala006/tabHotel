import "./GuestRentCard.css"
import type { Booking } from "@/types/booking"
import GuestRentCardDetails from "../GuestRentCardDetails/GuestRentCardDetails"
import { useState } from "react"

interface Props {
    data: Booking
    setSignal: React.Dispatch<React.SetStateAction<boolean>>
}

function GuestRentCard({ data, setSignal }: Props) {
    const [showSignal, setShowSignal] = useState(false)

    const handleClick = () => {
        fetch(`${import.meta.env.VITE_API_URL}/bookings/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ roomId: data.room.id, guestId: data.guest.id }),
        }).then((res) => {
            if (res.statusText === "OK") {
                setSignal(true)
            }
        })
    }

    if (data) {
        return (
            <>
                <div className="guestRentCard">
                    <h1 className="guestRentCard__title">{data.room.roomType.name}</h1>
                    <img
                        className="guestRentCard__img"
                        src={import.meta.env.VITE_API_URL + data.room.roomType.imageUrl}
                    />
                    <h2 className="guestRentCard__price">{data.room.roomType.pricePerNight}$</h2>
                    <h3 className="guestRentCard__desc">{data.room.roomType.description}</h3>
                    <div className="guestRentCard__btns">
                        <button className="guestRentCard__btns__more" onClick={() => setShowSignal(true)}>
                            подробнее
                        </button>
                        <button className="guestRentCard__btns__cancel" onClick={handleClick}>
                            отменить
                        </button>
                    </div>
                </div>
                {showSignal && <GuestRentCardDetails details={data} setShowSignal={setShowSignal} />}
            </>
        )
    } else {
        return <></>
    }
}

export default GuestRentCard
