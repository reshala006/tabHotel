const defaultPath = "src/assets/images/slider/"

type container = {
    img: string
    value: string
    alt: string
}

const mainSliderValues: container[] = [
    {
        img: defaultPath + "hotel-balcony.png",
        value: "Место, где просто хочется лавандовый раф",
        alt: "hotel balcony",
    },
    {
        img: defaultPath + "common-area-second.png",
        value: "Уют, покой и вид на шум Перлина",
        alt: "common area",
    },
    {
        img: defaultPath + "common-area-first.png",
        value: "Черепашки ниндзя по утрам и вечерам среды",
        alt: "common area",
    },
    {
        img: defaultPath + "hotel-hall.png",
        value: "И темщикам место есть",
        alt: "hotel hall",
    },
]

export default mainSliderValues
