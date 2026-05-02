import { useState } from "react"
import "./CleaningCard.css"
import type { CleaningRoom } from "@/types"
import InputOutputPanel from "../../InputOutputPanel/InputOutputPanel"

interface Props {
    room: CleaningRoom
}

function CleaningCard({ room }: Props) {
    const [panelSignal, setPanelSignal] = useState<boolean>(false)
    const [cleaningState, setCleaningState] = useState({
        status: room.cleaningStatus,
        notes: room.notes,
    })

    const patchStatus = async () => {
        fetch(`${import.meta.env.VITE_API_URL}/maid/rooms/${room.roomId}/cleaning`, {
            method: "PATCH",
            credentials: "include",
            body: JSON.stringify({
                ...cleaningState,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((data) => {
            console.log(data)
        })
    }

    return (
        <>
            {panelSignal && (
                <InputOutputPanel
                    notesState={cleaningState.notes}
                    setCleaningState={setCleaningState}
                    setPanelSignal={setPanelSignal}
                />
            )}
            <div className="cleaningCard">
                <div className="cleaningCard__lists">
                    <ul className="cleaningCard__list cleaningCard__list--keys">
                        <li className="cleaningCard__item">номер:</li>
                        <li className="cleaningCard__item">этаж:</li>
                        <li className="cleaningCard__item">тип:</li>
                        <li className="cleaningCard__item">этап:</li>
                        <li className="cleaningCard__item">статус:</li>
                        <li className="cleaningCard__item">заметка:</li>
                    </ul>
                    <ul className="cleaningCard__list">
                        <li className="cleaningCard__item">{room.roomNumber}</li>
                        <li className="cleaningCard__item">{room.floor}</li>
                        <li className="cleaningCard__item">{room.roomType}</li>
                        <select
                            className="cleaningCard__select"
                            defaultValue={cleaningState.status}
                            onChange={(element) => {
                                setCleaningState((prew) => {
                                    return { ...prew, status: element.target.value }
                                })
                            }}
                        >
                            <option value={"dirty"}>грязная</option>
                            <option value={"in_progress"}>в процессе</option>
                            <option value={"clean"}>чистая</option>
                        </select>
                        <li className="cleaningCard__item">{room.cleaningStatus}</li>
                        <div className="cleaningCard__notes">
                            <input
                                type="text"
                                className="cleaningCard__input"
                                value={cleaningState.notes}
                                onChange={(element) => {
                                    setCleaningState((prew) => {
                                        return {
                                            ...prew,
                                            notes: element.target.value,
                                        }
                                    })
                                }}
                            />
                            <button className="cleaningCard__notes-btn" onClick={() => setPanelSignal(true)}>
                                ...
                            </button>
                        </div>
                    </ul>
                </div>
                <button className="cleaningCard__submit-btn" onClick={() => patchStatus()}>
                    обновить статус
                </button>
            </div>
        </>
    )
}

export default CleaningCard
