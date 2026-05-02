import "./NotificationProvider.css"
import { NotificationContext } from "@/hooks/useNotification"
import { useRef, useState, type ReactNode } from "react"

type Props = {
    children: ReactNode
}

export const NotificationProvider = ({ children }: Props) => {
    const [message, setMessage] = useState("")
    const [key, setKey] = useState(0)
    const timeoutRef = useRef<number | null>(null)

    const show = (text: string) => {
        setMessage(text)

        setKey((prev) => prev + 1)

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            setMessage("")
        }, 3000)
    }

    return (
        <NotificationContext.Provider value={{ show }}>
            {children}

            {message && (
                <div key={key} className="notification">
                    {message}
                </div>
            )}
        </NotificationContext.Provider>
    )
}
