import hotelBalcony from "@assets/images/slider/hotel-balcony.webp"
import commonAreaSecond from "@assets/images/slider/common-area-second.webp"
import commonAreaFirst from "@assets/images/slider/common-area-first.webp"
import hotelHall from "@assets/images/slider/hotel-hall.webp"

type container = {
    img: string
    value: string
    alt: string
}

const mainSliderValues: container[] = [
    {
        img: hotelBalcony,
        value: "Место, где просто хочется лавандовый раф",
        alt: "hotel balcony",
    },
    {
        img: commonAreaSecond,
        value: "Уют, покой и вид на шум Перлина",
        alt: "common area",
    },
    {
        img: commonAreaFirst,
        value: "Черепашки ниндзя по утрам и вечерам среды",
        alt: "common area",
    },
    {
        img: hotelHall,
        value: "И темщикам место есть",
        alt: "hotel hall",
    },
]

export default mainSliderValues
