import "./Main.css"
import Header from "@/components/common/MainPage/Header/Header"
import Review from "@/components/common/MainPage/Review/Review"
import Slider from "@/components/common/MainPage/Slider/Slider"
import Footer from "@/components/common/MainPage/Footer/Footer"

function Main() {
    return (
        <div className="main">
            <Header />
            <Review />
            <Slider />
            <Footer />
        </div>
    )
}

export default Main
