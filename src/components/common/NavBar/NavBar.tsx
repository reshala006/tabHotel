import "./NavBar.css"
import { Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import posts from "@/constants/posts"
import urls from "@/constants/urls"
import BurgerButton from "@/components/ui/BurgerButton/BurgerButton"
import Logo from "@/components/ui/Logo/Logo"

interface NavBarProps {
    post: keyof typeof posts
}

function NavBar({ post }: NavBarProps) {
    const [burgerState, setBurgerState] = useState(false)
    const listRef = useRef<HTMLUListElement>(null)
    const navBarRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 576) {
                setBurgerState(false)
            }
        }

        window.addEventListener("resize", handleResize)

        handleResize()

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        if (listRef.current && navBarRef.current) {
            const listStyle = listRef.current.style
            const navBarStyle = navBarRef.current.style
            if (burgerState) {
                listStyle.left = "0%"
                navBarStyle.overflowX = "visible"
            } else {
                listStyle.left = "100%"
                navBarStyle.overflowX = "hidden"
            }
        }
    }, [burgerState])

    return (
        <nav ref={navBarRef} className="navBar">
            <div className="navBar__logo">
                <Logo />
            </div>

            <ul ref={listRef} className="navBar__list">
                {posts[post].columns.map((item, index) => (
                    <Link
                        to={urls[item]}
                        key={index}
                        className="navBar__list__item"
                        onClick={() => {
                            setBurgerState(false)
                            document.body.style.overflow = "visible"
                        }}
                    >
                        {item}
                    </Link>
                ))}
            </ul>

            <BurgerButton state={burgerState} setState={setBurgerState} />
        </nav>
    )
}

export default NavBar
