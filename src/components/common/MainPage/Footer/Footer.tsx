import "./Footer.css"
import media from "@/constants/media"
import tabHotelLogo from "@assets/images/tabHotelLogo.svg"
import footerBg from "@assets/images/footer/footer.png"
import footerStone from "@assets/images/footer/footer-stone.png"

import { hotelData } from "@/constants/values"
import { Link } from "react-router-dom"

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__meet">
                <img src={tabHotelLogo} alt="minecraft logo" />
                <h1>ждем вас</h1>
            </div>

            <div className="footer__ref" style={{ backgroundImage: `url(${footerBg})` }}>
                <button
                    className="footer__ref__server"
                    style={{ backgroundImage: `url(${footerStone})` }}
                    onClick={() => navigator.clipboard.writeText(hotelData.coordinates)}
                >
                    {hotelData.address + " " + hotelData.coordinates}
                </button>

                <div className="footer__ref__media">
                    {media.map((value, index) => (
                        <Link key={index} to={value.ref}>
                            <img src={value.src} alt={value.name} />
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    )
}

export default Footer
