import "./Header.css"
import Logo from "@/components/ui/Logo/Logo"
import { hotelData } from "@/constants/values"

function Header() {
    return (
        <header className="header">
            <div className="header__logo">
                <Logo />
            </div>

            <div className="header__welcome">
                <h1 className="header__welcome__title">Хватить спать в машuне</h1>

                <div className="header__welcome__path">
                    <h1 className="header__welcome__path__title">Заселяйся к нам по адресу:</h1>
                    <button
                        className="header__welcome__path__ref"
                        onClick={() => {
                            navigator.clipboard.writeText(hotelData.coordinates)
                        }}
                    >
                        {hotelData.address + " " + hotelData.coordinates}
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header
