import { useParams } from "react-router-dom"
import "./Room.css"
import { useAppSelector } from "@/hooks/useTypedRedux"
import { useEffect } from "react"

function Room() {
    const { id } = useParams()
    const { rooms } = useAppSelector((state) => state.rooms)
    const room = rooms ? rooms[Number(id)] : null

    useEffect(() => {
        if (rooms && id) {
            console.log()
        }
    }, [rooms, id])

    return (
        <div className="room">
            <div className="room__main">
                <img className="room__main__img" src={import.meta.env.VITE_API_URL + room?.roomType.imageUrl} />
                <div className="room__main__info">
                    <p className="room__main__info__p">тип: {room?.roomType.name}</p>
                    <p className="room__main__info__p">мест:{room?.roomType.capacity} </p>
                    <p className="room__main__info__p">цена: {room?.roomType.pricePerNight}</p>
                    <p className="room__main__info__p">описание: {room?.roomType.description} </p>
                </div>
            </div>
            <div className="room__imgs">
                {room?.imageUrls.map((value, index) => (
                    <>
                        {(() => {
                            if (index === 1) {
                                return null
                            }
                            return (
                                <img
                                    key={index}
                                    className="room__imgs__img"
                                    src={import.meta.env.VITE_API_URL + value}
                                />
                            )
                        })()}
                    </>
                ))}
            </div>
        </div>
    )
}
export default Room
