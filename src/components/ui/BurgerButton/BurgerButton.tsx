import "./BurgerButton.css"

interface burgerButtonProps {
    state: boolean
    setState: (value: boolean) => void
}

function BurgerButton({ state, setState }: burgerButtonProps) {
    const handleClick = () => {
        setState(!state)
        document.body.style.overflow = state ? "visible" : "hidden"
    }

    return (
        <div className={`burgerButton ${state ? "active" : ""}`} onClick={handleClick}>
            <div className="burgerButton__item"></div>
            <div className="burgerButton__item"></div>
            <div className="burgerButton__item"></div>
        </div>
    )
}

export default BurgerButton
