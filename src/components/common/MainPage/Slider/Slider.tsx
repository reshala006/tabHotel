import "./Slider.css"
import mainSliderValues from "@/constants/mainSlider"
import bow from "@assets/images/bow.png"
import { useState, useEffect } from "react"
import useWindowSize from "@/hooks/useWindowSize"

function Slider() {
    const [value, setValue] = useState(0)
    const { windowWidth } = useWindowSize()

    useEffect(() => {
        mainSliderValues.forEach((item) => {
            const img = new Image()
            img.src = item.img
        })
    }, [])

    return (
        <div className="slider">
            <div className="slider__top">
                <div
                    className="slider__top__button-back"
                    onClick={() => {
                        setValue((prev) => (prev === 0 ? mainSliderValues.length - 1 : prev - 1))
                    }}
                >
                    {windowWidth > 991 ? <img src={bow} alt="bow button" /> : "<"}
                </div>

                <div className="slider__top__img">
                    <img src={mainSliderValues[value].img} alt={mainSliderValues[value].alt} />
                </div>

                <div
                    className="slider__top__button-forward"
                    onClick={() => {
                        setValue((prev) => (prev === mainSliderValues.length - 1 ? 0 : prev + 1))
                    }}
                >
                    {windowWidth > 991 ? <img src={bow} alt="bow button" /> : ">"}
                </div>
            </div>

            <div className="slider__bottom">
                <p>{mainSliderValues[value].value}</p>
            </div>
        </div>
    )
}

export default Slider
