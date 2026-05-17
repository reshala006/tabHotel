import urls from "./urls"

type UrlKey = keyof typeof urls

interface Post {
    post: string
    columns: readonly UrlKey[]
}

const posts = {
    guest: {
        post: "guest",
        columns: ["главная", "комнаты", "аренда", "профиль"],
    },
    maid: {
        post: "maid",
        columns: ["уборка", "профиль"],
    },
    manager: {
        post: "manager",
        columns: ["брони", "заселить", "профиль"],
    },
    admin: {
        post: "admin",
        columns: ["статистика", "заселить", "пользователи", "брони", "профиль"],
    },
} as Record<string, Post>

export default posts
