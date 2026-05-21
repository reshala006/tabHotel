const defaultPath = "/assets/images/slider/"

type container = {
    img: string
    value: string
    alt: string
}

const mainSliderValues: container[] = [
    {
        img: defaultPath + "hotel-balcony.webp",
        value: "Место, где просто хочется лавандовый раф",
        alt: "hotel balcony",
    },
    {
        img: defaultPath + "common-area-second.webp",
        value: "Уют, покой и вид на шум Перлина",
        alt: "common area",
    },
    {
        img: defaultPath + "common-area-first.webp",
        value: "Черепашки ниндзя по утрам и вечерам среды",
        alt: "common area",
    },
    {
        img: defaultPath + "hotel-hall.webp",
        value: "И темщикам место есть",
        alt: "hotel hall",
    },
]

export default mainSliderValues
