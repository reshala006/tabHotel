import { useState, useEffect } from "react"

function useWindowSize() {
    const [windowSize, setWindowSize] = useState(() => ({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
    }))

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight,
            })
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return windowSize
}

export default useWindowSize
