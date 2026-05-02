import "./StaffRoomsFilter.css"
import type { StaffRentFilters } from "@/types"

type Props = {
    setFilters: React.Dispatch<React.SetStateAction<StaffRentFilters>>
}

function StaffRoomsFilter({ setFilters }: Props) {
    return (
        <div className="staffRoomsFilter">
            <div className="staffRoomsFilter__point">
                <input
                    type="date"
                    className="staffRoomsFilter__input"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFilters((prev) => ({
                            ...prev,
                            dateFrom: event.target.value,
                        }))
                    }}
                />
                <div className="staffRoomsFilter__title">:</div>
                <input
                    type="date"
                    className="staffRoomsFilter__input"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFilters((prev) => ({
                            ...prev,
                            dateTo: event.target.value,
                        }))
                    }}
                />
            </div>
            <div className="staffRoomsFilter__point">
                <div className="staffRoomsFilter__title">имя:</div>
                <input
                    type="text"
                    className="staffRoomsFilter__input"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFilters((prev) => ({
                            ...prev,
                            name: event.target.value,
                        }))
                    }}
                />
            </div>

            <div className="staffRoomsFilter__point">
                <div className="staffRoomsFilter__title">почта:</div>
                <input
                    type="email"
                    className="staffRoomsFilter__input"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFilters((prev) => ({
                            ...prev,
                            email: event.target.value,
                        }))
                    }}
                />
            </div>

            <div className="staffRoomsFilter__point">
                <div className="staffRoomsFilter__title">телефон:</div>
                <input
                    type="tel"
                    className="staffRoomsFilter__input"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFilters((prev) => ({
                            ...prev,
                            tel: event.target.value,
                        }))
                    }}
                />
            </div>
        </div>
    )
}
export default StaffRoomsFilter
