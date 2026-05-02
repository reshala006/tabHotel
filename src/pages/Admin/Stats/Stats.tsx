import "./Stats.css"
import { useEffect, useState } from "react"
import type { StatsType } from "@/types/stats"

function Stats() {
    const [stats, setStats] = useState<StatsType | null>(null)

    useEffect(() => {
        const loadStats = async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/stats`, {
                credentials: "include",
                method: "GET",
            })

            const data = await res.json()
            setStats(data)
        }

        loadStats()
    }, [])

    if (!stats) {
        return <div className="stats">Loading...</div>
    }
    return (
        <div className="stats">
            <div className="stats__rooms">
                <h1 className="stats__title">rooms</h1>
                <div className="stats__lists">
                    <ul className="stats__list stats__list-key">
                        <li className="stats__item">количество:</li>
                        <li className="stats__item">доступно:</li>
                        <li className="stats__item">занято:</li>
                    </ul>
                    <ul className="stats__list stats__list-value">
                        <li className="stats__item">{stats.rooms.total}</li>
                        <li className="stats__item">{stats.rooms.available}</li>
                        <li className="stats__item">{stats.rooms.occupied}</li>
                    </ul>
                </div>
            </div>
            <div className="stats__rent">
                <h1 className="stats__title">бронирования</h1>
                <div className="stats__lists">
                    <ul className="stats__list stats__list-key">
                        <li className="stats__item">количество:</li>
                        <li className="stats__item">ежемесячно:</li>
                    </ul>
                    <ul className="stats__list stats__list-value">
                        <li className="stats__item">{stats.bookings.total}</li>
                        <li className="stats__item">{stats.bookings.monthly}</li>
                    </ul>
                </div>
            </div>
            <div className="stats__revenue">
                <h1 className="stats__title">выручка</h1>
                <div className="stats__lists">
                    <ul className="stats__list stats__list-key">
                        <li className="stats__item">итого:</li>
                        <li className="stats__item">ежемесячно:</li>
                    </ul>
                    <ul className="stats__list stats__list-value">
                        <li className="stats__item">{stats.revenue.total}</li>
                        <li className="stats__item">{stats.revenue.monthly}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Stats
