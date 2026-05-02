import { useNavigate } from "react-router-dom"
import "./RoomCard.css"
import type { Room } from "@/types/room"
import type { Filters } from "@/types"
import { useNotification } from "@/hooks/useNotification"
import { useAppDispatch } from "@/hooks/useTypedRedux"
import { fetchRoomsAvailable } from "@/store/action/roomsAvailable"

interface Props {
    data: Room
    filters: Filters
}

function RoomCard({ data, filters }: Props) {
    const navigate = useNavigate()
    const { show } = useNotification()
    const dispatch = useAppDispatch()

    const handleClick = () => {
        fetch(`${import.meta.env.VITE_API_URL}/bookings/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                roomTypeId: data.roomType.id,
                checkInDate: filters.checkInDate,
                checkOutDate: filters.checkOutDate,
            }),
        }).then((data) => {
            if (data.statusText === "Unauthorized") navigate("/profile")
            else if (data.statusText == "Bad Request") {
                show("error")
            } else if (data.statusText === "Created") {
                show("success")
                dispatch(fetchRoomsAvailable(filters))
            }
        })
    }

    return (
        <div className="roomCard" data-index={data.id}>
            <h1 className="roomCard__title">{data.roomType.name}</h1>
            <img className="roomCard__img" src={import.meta.env.VITE_API_URL + data.roomType.imageUrl} />
            <h2 className="roomCard__price">{data.roomType.pricePerNight}$</h2>
            <h3 className="roomCard__desc">{data.roomType.description}</h3>
            <div className="roomCard__btns">
                <button className="roomCard__btns__more" onClick={() => navigate(`/rooms/${data.number / 3}`)}>
                    подробнее
                </button>
                <button
                    className="roomCard__btns__rent"
                    onClick={() => {
                        handleClick()
                    }}
                >
                    арендовать
                </button>
            </div>
        </div>
    )
}

export default RoomCard
