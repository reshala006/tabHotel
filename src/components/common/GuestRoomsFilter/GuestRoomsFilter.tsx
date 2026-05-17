import { useRef } from "react"
import "./GuestRoomsFilter.css"
import type { Room } from "@/store/types/rooms"
import type { Filters } from "@/types"

type Props = {
    allRooms: Record<number, Room> | null
    filters: Filters
    setFilters: React.Dispatch<React.SetStateAction<Filters>>
}

function GuestRoomsFilter({ filters, setFilters }: Props) {
    const timeoutRef = useRef<number | null>(null)

    const handleChange = (key: string, value: string | number) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    return (
        <div className="guestRoomsFilter">
            <div className="guestRoomsFilter__date">
                <span className="guestRoomsFilter__title">дата</span>
                <input
                    className="guestRoomsFilter__input"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    defaultValue={filters.checkInDate}
                    onChange={(event) => {
                        handleChange("checkInDate", event.target.value)
                    }}
                />
                <span className="guestRoomsFilter__title">:</span>
                <input
                    className="guestRoomsFilter__input"
                    type="date"
                    min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0]}
                    defaultValue={filters.checkOutDate}
                    onChange={(event) => {
                        handleChange("checkOutDate", event.target.value)
                    }}
                />
            </div>
            <div className="guestRoomsFilter__type">
                <span className="guestRoomsFilter__title">тип</span>
                <select
                    className="guestRoomsFilter__list"
                    defaultValue={filters.roomTypeId}
                    onChange={(event) => {
                        handleChange("roomTypeId", Number(event.target.value))
                    }}
                >
                    <option value={0}>все</option>
                    <option value={1}>эконом</option>
                    <option value={2}>комфорт</option>
                    <option value={3}>люкс</option>
                </select>
            </div>
            <div className="guestRoomsFilter__capacity">
                <span className="guestRoomsFilter__title">мест</span>
                <select
                    className="guestRoomsFilter__list"
                    defaultValue={filters.capacity}
                    onChange={(event) => {
                        handleChange("capacity", Number(event.target.value))
                    }}
                >
                    <option value={0}>все</option>
                    <option value={1}>1</option>
                    <option value={2}>1+1</option>
                    <option value={3}>2</option>
                </select>
            </div>
            <div className="guestRoomsFilter__price">
                <span className="guestRoomsFilter__title">цена</span>
                <input
                    className="guestRoomsFilter__input"
                    type="number"
                    defaultValue={filters.priceFrom}
                    onChange={(event) => {
                        let value = Number(event.target.value)

                        if (value > 8000) value = 8000
                        if (value < 0) value = 0

                        if (timeoutRef.current) {
                            clearTimeout(timeoutRef.current)
                        }

                        timeoutRef.current = window.setTimeout(() => {
                            handleChange("priceFrom", value)
                        }, 500)
                    }}
                />
                <span className="guestRoomsFilter__title">:</span>
                <input
                    className="guestRoomsFilter__input"
                    type="number"
                    defaultValue={filters.priceTo}
                    onChange={(event) => {
                        let value = Number(event.target.value)

                        if (value > 8000) value = 8000
                        if (value < 0) value = 0

                        if (timeoutRef.current) {
                            clearTimeout(timeoutRef.current)
                        }

                        timeoutRef.current = window.setTimeout(() => {
                            handleChange("priceTo", value)
                        }, 500)
                    }}
                />
            </div>
        </div>
    )
}

export default GuestRoomsFilter
