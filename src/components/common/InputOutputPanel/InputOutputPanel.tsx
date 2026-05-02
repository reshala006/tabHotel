import { useState } from "react"
import "./InputOutputPanel.css"

interface Props {
    notesState: string
    setCleaningState: React.Dispatch<React.SetStateAction<{ status: string; notes: string }>>
    setPanelSignal: React.Dispatch<React.SetStateAction<boolean>>
}
function InputOutputPanel({ notesState, setCleaningState, setPanelSignal }: Props) {
    const [localState, setLocalState] = useState("")
    console.log(notesState)
    return (
        <div className="InputOutputPanel">
            <div className="InputOutputPanel__window">
                <textarea
                    className="InputOutputPanel__textarea"
                    defaultValue={notesState}
                    onChange={(element) => setLocalState(element.target.value)}
                ></textarea>
                <div className="InputOutputPanel__choise">
                    <button className="InputOutputPanel__btn" onClick={() => setPanelSignal(false)}>
                        отмена
                    </button>
                    <button
                        className="InputOutputPanel__btn"
                        onClick={() => {
                            setCleaningState((prew) => {
                                return { ...prew, notes: localState }
                            })
                            setPanelSignal(false)
                        }}
                    >
                        заменить
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InputOutputPanel
