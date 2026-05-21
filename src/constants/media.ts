const defaultPath = "/assets/images/media/"

type mediaData = {
    src: string
    name: string
    ref: string
}

const media: mediaData[] = [
    {
        src: defaultPath + "telegram.png",
        name: "telegram",
        ref: "/none",
    },
    {
        src: defaultPath + "whatsapp.png",
        name: "whatsapp",
        ref: "/none",
    },
    {
        src: defaultPath + "x.png",
        name: "x",
        ref: "/none",
    },
]

export default media
