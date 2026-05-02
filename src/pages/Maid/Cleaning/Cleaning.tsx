import "./Cleaning.css"
import { useEffect, useState } from "react"
import type { CleaningFiltersType, CleaningRoom } from "@/types"
import CleaningCard from "@/components/common/Maid/CleaningCard/CleaningCard"
import CleaningFilters from "@/components/common/Maid/CleaningFilters/CleaningFilters"

function filterOutRooms(filters: CleaningFiltersType, rooms: CleaningRoom[]) {
    let filterOutRooms

    if (!filters.number && !filters.floor) return rooms

    if (filters.number && filters.floor) {
        filterOutRooms = rooms.filter((room) => room.roomNumber === filters.number && room.floor === filters.floor)
        return filterOutRooms
    }

    if (filters.number) {
        filterOutRooms = rooms.filter((room) => room.roomNumber === filters.number)
        return filterOutRooms
    }

    if (filters.floor) {
        filterOutRooms = rooms.filter((room) => room.floor === filters.floor)
        return filterOutRooms
    }

    return rooms
}

function Cleaning() {
    const [cleaningRooms, setCleaningRooms] = useState<CleaningRoom[] | null>(null)
    const [filters, setFilters] = useState<CleaningFiltersType>({ number: 0, floor: 0 })

    useEffect(() => {
        console.log("перерендер страницы Cleaning")
        const fetchData = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/maid/tasks`, {
                method: "GET",
                credentials: "include",
            })
            if (response.status === 200) {
                const data: CleaningRoom[] = await response.json()
                setCleaningRooms(data)
            }
        }
        fetchData()
    }, [])

    const filteredRooms = cleaningRooms ? filterOutRooms(filters, cleaningRooms) : []

    if (!cleaningRooms) {
        return (
            <div className="cleaning">
                <CleaningFilters filters={filters} setFilters={setFilters} />
                <div className="loading">...загрузка</div>
            </div>
        )
    }

    return (
        <div className="cleaning">
            <CleaningFilters filters={filters} setFilters={setFilters} />
            <div className="cleaning__list">
                {filteredRooms.map((room) => (
                    <CleaningCard key={room.roomId} room={room} />
                ))}
            </div>
        </div>
    )
}

export default Cleaning
