import { useEffect, useState } from "react"
import "./StaffRent.css"
import StaffRoomsFilter from "@/components/common/Staff/StaffRoomsFilter/StaffRoomsFilter"
import type { StaffRentFilters } from "@/types"
import { useAppDispatch, useAppSelector } from "@/hooks/useTypedRedux"
import RentCard from "@/components/common/Staff/RentCard/RentCard"
import { fetchStaffBookings } from "@/store/action/staffBookings"

function matchesValue(input: string, value: string): boolean {
    if (!input) return true

    const normalizedInput = input.toLowerCase().trim()
    const normalizedValue = value.toLowerCase()

    return normalizedValue.includes(normalizedInput)
}

function StaffRent() {
    const bookings = useAppSelector((state) => state.staffBookings)
    const dispatch = useAppDispatch()

    const [filters, setFilters] = useState<StaffRentFilters>({
        dateFrom: "",
        dateTo: "",
        name: "",
        email: "",
        tel: "",
    })

    useEffect(() => {
        dispatch(fetchStaffBookings())
    }, [dispatch])

    const filteredBookings = bookings.bookings?.filter((booking) => {
        const guest = booking.guest

        const checkIn = new Date(booking.checkInDate)

        const from = filters.dateFrom ? new Date(filters.dateFrom) : null
        const to = filters.dateTo ? new Date(filters.dateTo) : null

        const dateMatch = (!from || checkIn >= from) && (!to || checkIn <= to)

        return (
            dateMatch &&
            matchesValue(filters.name, `${guest.firstName} ${guest.lastName}`) &&
            matchesValue(filters.email, guest.email) &&
            matchesValue(filters.tel, guest.phoneNumber)
        )
    })
    if (bookings.loading) return <>Загрузка...</>

    return (
        <div className="staffRent">
            <StaffRoomsFilter setFilters={setFilters} />

            <div className="staffRent__list">
                {filteredBookings?.map((value) => (
                    <RentCard key={value.id} data={value} />
                ))}
            </div>
        </div>
    )
}

export default StaffRent
