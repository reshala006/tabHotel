import type { Booking } from "@/store/types/staffBookings"
import "./RentCard.css"
import { useState } from "react"
import { useNotification } from "@/hooks/useNotification"
// import { useAppDispatch } from "@/hooks/useTypedRedux"
// import { fetchStaffBookings } from "@/store/action/staffBookings"

interface Props {
    data: Booking
}

function RentCard({ data }: Props) {
    // const dispatch = useAppDispatch()
    const currentDate = new Date()
    const bookingDate = new Date(data.checkInDate)
    const [select, setSelect] = useState<string>(data.status)
    const { show } = useNotification()
    const restatusClick = async () => {
        console.log(JSON.stringify({ status: select }))
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/bookings/${data.id}/status`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: select }),
        })
        if (response.status === 200) {
            show("success")
        } else {
            show("error")
        }
    }

    return (
        <div className="rentCard">
            <div className="rentCard__lists">
                <ul className="rentCard__list rentCard__list-key">
                    <li className="rentCard__item">имя:</li>
                    <li className="rentCard__item">почта:</li>
                    <li className="rentCard__item">телефон:</li>
                    <li className="rentCard__item">номер:</li>
                    <li className="rentCard__item">этаж:</li>
                    <li className="rentCard__item">въезд:</li>
                    <li className="rentCard__item">выезд:</li>
                    <li className="rentCard__item">тип номера:</li>
                    <li className="rentCard__item">статус номера:</li>
                    <li className="rentCard__item">статус брони:</li>
                    <li className="rentCard__item">цена за ноч:</li>
                    <li className="rentCard__item">итоговая цена:</li>
                    <li className="rentCard__item">дата брони:</li>
                </ul>
                <ul className="rentCard__list">
                    {data.guestData?.firstName ? (
                        <li className="rentCard__item">{`${data.guestData.firstName} ${data.guestData.lastName}`}</li>
                    ) : (
                        <li className="rentCard__item">{`${data.guest.firstName} ${data.guest.lastName}`}</li>
                    )}
                    <li className="rentCard__item">{data.guest.email}</li>
                    {data.guestData?.phone ? (
                        <li className="rentCard__item">{data.guestData.phone}</li>
                    ) : (
                        <li className="rentCard__item">{data.guest.phoneNumber}</li>
                    )}
                    <li className="rentCard__item">{data.room.number}</li>
                    <li className="rentCard__item">{data.room.floor}</li>
                    <li className="rentCard__item">{data.checkInDate.split("T")[0]}</li>
                    <li className="rentCard__item">{data.checkOutDate.split("T")[0]}</li>
                    <li className="rentCard__item">{data.room.roomType.name}</li>
                    <li className="rentCard__item">{data.room.status}</li>
                    <select
                        className="rentCard__select"
                        value={select}
                        onChange={(element) => setSelect(element.target.value)}
                    >
                        <option value="confirmed">confirmed</option>
                        {currentDate >= bookingDate ? (
                            <>
                                <option value="checked_in">checked_in</option>
                                <option value="checked_out">checked_out</option>
                            </>
                        ) : null}
                        <option value="cancelled">cancelled</option>
                    </select>
                    <li className="rentCard__item">{data.room.roomType.pricePerNight}</li>
                    <li className="rentCard__item">{data.totalPrice}</li>
                    <li className="rentCard__item">{data.createdAt.split("T")[0]}</li>
                </ul>
            </div>
            <button className="rentCard__btn" onClick={restatusClick}>
                обновить статус
            </button>
        </div>
    )
}

export default RentCard
