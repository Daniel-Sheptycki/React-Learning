/* eslint-disable react/prop-types */
import "../css/rating.css"
export default function Rating(props) {
    //Define src and alt for the rating img
    const ratingSrc = `../assets/rating_imgs/Rating${props.rating}.png`;
    const ratingAlt = `The users rating on this product: ${props.rating}/5`
    return (
        <li className="rating">
            <header>
                <div className="rating-img-container">
                    <img src={ratingSrc} alt={ratingAlt} />
                </div>
                <h4><i>{props.author}</i></h4>
            </header>
            <p>{props.message}</p>
        </li>
    )
}