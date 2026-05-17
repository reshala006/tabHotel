import "./StaffBookings.css"
import GuestRoomsFilter from "@/components/common/GuestRoomsFilter/GuestRoomsFilter"
import { useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/useTypedRedux"
import { fetchRooms } from "@/store/action/rooms"
import RoomCard from "@/components/common/Staff/RoomCard/RoomCard"
import type { Filters } from "@/types"
import { fetchRoomsAvailable } from "@/store/action/roomsAvailable"

const roomMap: Record<string, number[]> = {
    "0-0": [1, 2, 3, 4, 5, 6, 7, 8, 9],
    "0-1": [1, 4, 7],
    "0-2": [2, 5, 8],
    "0-3": [3, 6, 9],

    "1-0": [1, 2, 3],
    "1-1": [1],
    "1-2": [2],
    "1-3": [3],

    "2-0": [4, 5, 6],
    "2-1": [4],
    "2-2": [5],
    "2-3": [6],

    "3-0": [7, 8, 9],
    "3-1": [7],
    "3-2": [8],
    "3-3": [9],
}

function getRoomTypeIds(type: number, capacity: number) {
    return roomMap[`${type}-${capacity}`] || "0-0"
}

type userDataType = {
    firstName: string
    lastName: string
    phone: string
}

function StaffBookins() {
    const [userData, setUserData] = useState<userDataType>({
        firstName: "",
        lastName: "",
        phone: "",
    })
    const [filters, setFilters] = useState<Filters>({
        checkInDate: new Date().toISOString().split("T")[0],
        checkOutDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split("T")[0],
        roomTypeId: 0,
        capacity: 0,
        priceFrom: 0,
        priceTo: 8000,
    })

    const { rooms, loading: roomsLoading } = useAppSelector((state) => state.rooms)
    const { roomsAvailable, loading: roomsAvailableLoading } = useAppSelector((state) => state.roomsAvailable)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!rooms && !roomsLoading) {
            dispatch(fetchRooms())
        }
    }, [dispatch, rooms, roomsLoading])

    useEffect(() => {
        if (!rooms) return
        dispatch(fetchRoomsAvailable(filters))
    }, [dispatch, filters, rooms])

    const allowedRoomIds = getRoomTypeIds(filters.roomTypeId!, filters.capacity!)
    const availableRoomsSet = useMemo(() => new Set(roomsAvailable), [roomsAvailable])
    if (roomsLoading || roomsAvailableLoading) {
        return (
            <div className="rooms">
                <div className="rooms__loading">Загрузка...</div>
            </div>
        )
    }

    if (!rooms || !roomsAvailable) {
        return (
            <div className="rooms">
                <div className="rooms__error">Нет данных</div>
            </div>
        )
    }

    return (
        <div className="rooms">
            <GuestRoomsFilter allRooms={rooms} filters={filters} setFilters={setFilters} />

            <div className="staffBookins__guest">
                <input
                    value={userData.firstName}
                    onChange={(e) =>
                        setUserData((prev) => ({
                            ...prev,
                            firstName: e.target.value,
                        }))
                    }
                    placeholder="имя"
                    type="text"
                />

                <input
                    value={userData.lastName}
                    onChange={(e) =>
                        setUserData((prev) => ({
                            ...prev,
                            lastName: e.target.value,
                        }))
                    }
                    placeholder="фамилия"
                    type="text"
                />

                <input
                    value={userData.phone}
                    onChange={(e) =>
                        setUserData((prev) => ({
                            ...prev,
                            phone: e.target.value,
                        }))
                    }
                    placeholder="телефон"
                    type="tel"
                />
            </div>
            <div className="rooms__list">
                {allowedRoomIds.map((value) => {
                    if (availableRoomsSet.has(value)) {
                        return <RoomCard key={value} data={rooms[value]} filters={filters} userData={userData} />
                    }
                })}
            </div>
        </div>
    )
}

export default StaffBookins
