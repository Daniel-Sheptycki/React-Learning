/* eslint-disable react/prop-types */
import ProductImg from './ProductImg';
import '../css/product.css';
import { useState } from 'react';
import { UploadProduct } from '../js/firebase';
import Rating from './Rating';
import { nanoid } from 'nanoid';
export default function Product(props) {
    const [ratingsOpen, openRatings] = useState(false);

    const [addingRating, openAddRating] = useState(false);

    const [ratings, setRatings] = useState(props.ratings);

    const [rating, setRating] = useState(props.rating);

    //Define src and alt for the rating img
    const ratingSrc = `../assets/rating_imgs/Rating${rating}.png`;
    const ratingAlt = `The users rating on this product: ${rating}/5`

    //Map an array of Rating objects to display
    const displayRatings = ratings.map((rating) => <Rating key={nanoid()} rating={rating.rating} message={rating.message} author={rating.author}/>)

    function handleSubmit(form) {
        //Stop the form from resetting
        form.preventDefault();

        //Create a new rating object containing the numeric rating and the message
        const newRating = {
            rating: Number(form.target[0].value),
            message: form.target[1].value,
            author: localStorage.getItem("username")
        }
        
        openAddRating(false);

        addRating(newRating);
    }
    function addRating(rating) {
        //Define a new array contaning all the ratings
        const updatedRatings = [...ratings];

        //Add the new rating to this array
        updatedRatings.push(rating);

        let sum = 0;

        //Calculate the sum of all the ratings
        updatedRatings.forEach(userRating => {
            sum += Number(userRating.rating);    
        });
        
        console.log("sum:", sum)
        //Calculate the average rating round up to the nearest half
        const avg = roundUpToNearestHalf(sum / updatedRatings.length);

        console.log(avg);

        //Re-add the product
        UploadProduct({
            title: props.title,
            price: props.price,
            desc: props.desc,
            img: props.img,
            ratings: updatedRatings,
            rating: avg,
        }, {username: props.author})

        //Update the ratings array with the new one
        setRatings(updatedRatings);

        setRating(avg);

        alert("Rating Added");
    }
    function roundUpToNearestHalf(num) {
        const wholePart = Math.floor(num);
        const fractionalPart = num - wholePart;
      
        if (fractionalPart <= 0.25) {
          return wholePart;
        } else if (fractionalPart <= 0.75) {
          return wholePart + 0.5;
        } else {
          return wholePart + 1;
        }
      }
      
    const viewRatingsPage = (
        <>
            <header>
                <h3>Ratings</h3>
                <p className='link-text' onClick={() => openRatings(false)}>Return</p>
            </header>
            <p className='sub-header-text'>This product is rated as {rating}/5</p>
            <div className='all-ratings-container'>
                {displayRatings}
            </div>
            <button type='button' onClick={openAddRating}>Add a Rating</button>
        </>
    )
    const addRatingPage = (
        <>
            <form className='add-rating-form' onSubmit={handleSubmit}>
                <header><h3>Add A Rating</h3></header>
                <div className='inputs'>
                    <div className='input'>
                        <label htmlFor="rating-select">Select Your Rating</label>
                        <input type="range" id='rating-select' min={0} max={5}/>
                    </div>
                    <div className='input'>
                        <label htmlFor="user-rating-message">Type Your Message</label>
                        <textarea name="message" id="user-rating-message" rows={10}></textarea>
                    </div>
                    <div className='buttons'>
                        <button type='button' onClick={() => openAddRating(false)}>Cancel</button>
                        <button type='submit'>Done</button>
                    </div>
                </div>
            </form>
        </>
    )
    const ratingPage = (
        <>
            {addingRating? addRatingPage : viewRatingsPage}
        </>
    )
    const mainPage = (
        <>
            <header style={{marginLeft: 90 - (props.title.length * 5), marginRight: 90 - (props.title.length * 5)}}>
                <h3>{props.title}</h3>
                <p>{props.price}$</p>
            </header>
            <p className='sub-header-text'>{props.author}</p>
            <div className='rating-container' onClick={props.isRatable? openRatings : () => {}}><div className='rating-img-container'><img src={ratingSrc} alt={ratingAlt} /></div><p><strong>{ratings.length}</strong></p></div>
            <ProductImg src={props.img} alt="User inputted image of their product"/>
            <p className='desc-text'>{props.desc}</p>
            <button onClick={props.onBuy}>Buy</button>
        </>
    )
    return (
        <article className='product'>
            {ratingsOpen? ratingPage : mainPage}
        </article>
    )
}