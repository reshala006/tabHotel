import "./Logo.css"
import tabHotelLogo from "@assets/images/tabHotelLogo.svg"
import { useNavigate } from "react-router-dom"

function Logo() {
    const navigate = useNavigate()

    return (
        <img
            src={tabHotelLogo}
            alt="tabHotel Logo"
            onClick={(event) => {
                event.preventDefault()
                navigate("/")
            }}
        />
    )
}

export default Logo
