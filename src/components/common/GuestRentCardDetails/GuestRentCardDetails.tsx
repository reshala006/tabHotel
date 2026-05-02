import type React from "react"
import "./GuestRentCardDetails.css"
import type { Booking } from "@/types/booking"

interface Props {
    details: Booking
    setShowSignal: React.Dispatch<React.SetStateAction<boolean>>
}

function GuestRentCardDetails({ details, setShowSignal }: Props) {
    return (
        <div className="guestRentCardDetails">
            <div className="guestRentCardDetails__window">
                {/* Ключи */}
                <div className="guestRentCardDetails__window__lists">
                    <ul className="guestRentCardDetails__window__lists__key-list">
                        <li className="guestRentCardDetails__window__lists__key-list__li">тип:</li>
                        <li className="guestRentCardDetails__window__lists__key-list__li">этаж:</li>
                        <li className="guestRentCardDetails__window__lists__key-list__li">номер:</li>
                        <li className="guestRentCardDetails__window__lists__key-list__li">на имя:</li>
                        <li className="guestRentCardDetails__window__lists__key-list__li">засиление:</li>
                        <li className="guestRentCardDetails__window__lists__key-list__li">выселение:</li>
                        <li className="guestRentCardDetails__window__lists__key-list__li">вместимость:</li>
                        <li className="guestRentCardDetails__window__lists__key-list__li">цена за ночь:</li>
                        <li className="guestRentCardDetails__window__lists__key-list__li">итоговая цена:</li>
                    </ul>

                    {/* Значения */}
                    <ul className="guestRentCardDetails__window__lists__value-list">
                        <li className="guestRentCardDetails__window__lists__value-list__li">
                            {details.room.roomType.name}
                        </li>
                        <li className="guestRentCardDetails__window__lists__value-list__li">{details.room.floor}</li>
                        <li className="guestRentCardDetails__window__lists__value-list__li">{details.room.number}</li>
                        <li className="guestRentCardDetails__window__lists__value-list__li">
                            {`${details.guest.firstName} ${details.guest.lastName}`}
                        </li>
                        <li className="guestRentCardDetails__window__lists__value-list__li">
                            {details.checkInDate.split("T")[0]}
                        </li>
                        <li className="guestRentCardDetails__window__lists__value-list__li">
                            {details.checkOutDate.split("T")[0]}
                        </li>
                        <li className="guestRentCardDetails__window__lists__value-list__li">
                            {details.room.roomType.capacity}
                        </li>
                        <li className="guestRentCardDetails__window__lists__value-list__li">
                            {details.room.roomType.pricePerNight}$
                        </li>
                        <li className="guestRentCardDetails__window__lists__value-list__li">{details.totalPrice}$</li>
                    </ul>
                </div>

                <button className="guestRentCardDetails__window__escape" onClick={() => setShowSignal(false)}>
                    выход
                </button>
            </div>
        </div>
    )
}

export default GuestRentCardDetails
