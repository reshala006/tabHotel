import telegram from "@assets/images/media/telegram.png"
import whatsapp from "@assets/images/media/whatsapp.png"
import x from "@assets/images/media/x.png"

type mediaData = {
    src: string
    name: string
    ref: string
}

const media: mediaData[] = [
    {
        src: telegram,
        name: "telegram",
        ref: "/none",
    },
    {
        src: whatsapp,
        name: "whatsapp",
        ref: "/none",
    },
    {
        src: x,
        name: "x",
        ref: "/none",
    },
]

export default media
