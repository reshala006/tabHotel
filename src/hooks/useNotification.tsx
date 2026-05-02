import { createContext, useContext } from "react"

type NotificationContextType = {
    show: (text: string) => void
}

export const NotificationContext = createContext<NotificationContextType | null>(null)

export const useNotification = () => {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error("useNotification must be used within NotificationProvider")
    }
    return context
}
