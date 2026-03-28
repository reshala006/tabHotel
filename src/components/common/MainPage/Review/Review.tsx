import "./Review.css"
import fullHotel from "@images/full-length-hotel.png"
import area from "@images/area.png"

function Review() {
    return (
        <div className="review">
            <div className="review__hotel">
                <div className="review__hotel__img">
                    <img src={fullHotel} />
                </div>
                <div className="review__hotel__text">
                    <p>
                        Расположенный на берегу живописной реки отел, предлагает номера с видом окресностей.
                        <br />A продуманный дизайн интерьера создаёт атмосферу комфорта и спокойствия.
                    </p>
                </div>
            </div>
            <div className="review__area">
                <div className="review__area__img">
                    <img src={area} />
                </div>
                <div className="review__area__text">
                    <p>вас ожидают захватывающие пейзажи и необъятные просторы, где взгляд не находит себе места.</p>
                </div>
            </div>
        </div>
    )
}

export default Review
