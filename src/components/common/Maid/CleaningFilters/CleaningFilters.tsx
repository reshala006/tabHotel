import type { CleaningFiltersType } from "@/types"
import "./CleaningFilters.css"

interface Props {
    filters: CleaningFiltersType
    setFilters: React.Dispatch<React.SetStateAction<CleaningFiltersType>>
}

function CleaningFilters({ filters, setFilters }: Props) {
    const handleNumberChange = (element: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(element.target.value)
        if (!isNaN(value) && value > 0) {
            setFilters((prev) => ({ ...prev, number: value }))
        } else {
            setFilters((prev) => ({ ...prev, number: 0 }))
        }
    }

    const handleFloorChange = (element: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(element.target.value)
        if (!isNaN(value) && value > 0) {
            setFilters((prev) => ({ ...prev, floor: value }))
        } else {
            setFilters((prev) => ({ ...prev, floor: 0 }))
        }
    }

    return (
        <div className="cleaningFilters">
            <div className="cleaningFilters__point">
                <h1 className="cleaningFilters__title">номер:</h1>
                <input
                    type="number"
                    className="cleaningFilters__input"
                    defaultValue={filters.number}
                    onChange={handleNumberChange}
                />
            </div>
            <div className="cleaningFilters__point">
                <h1 className="cleaningFilters__title">этаж:</h1>
                <input
                    type="number"
                    className="cleaningFilters__input"
                    defaultValue={filters.floor}
                    onChange={handleFloorChange}
                />
            </div>
        </div>
    )
}

export default CleaningFilters
