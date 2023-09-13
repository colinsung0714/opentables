import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from "../../context/Modal";
import '../NewReviewFormModal/NewReviewFormModal.css'
import { fetchSingleRestaurants } from "../../store/restaurant";
import { fetchaddReview, fetchupdateReview } from "../../store/review";
export const NewReviewFormModal = ({ reservation, user, type }) => {
    let updateReview = Object.values(useSelector(state=>state.review.restaurantReviews)).find(rev=>rev.userId==user.id)
    if(!updateReview) updateReview =  Object.values(reservation.restaurantInfo.reviews).find(rev=>rev.userId==user.id)  
    const { setModalContent, setOnModalClose, closeModal } = useModal();
    const [rating, setRating] = useState(type==='update' ? updateReview?.rating : 0)
    const [comment, setComment] = useState(type==='update' ? updateReview?.comment : '')
    const [error, setError] = useState({})
    const dispatch = useDispatch()
   
    const reservationDateStringParts = reservation.reservationDate.split(' ')[0].split('-')
    useEffect(()=>{
        const errorObj = {}
        if(comment?.length === 0) errorObj.length = 'error'
        if(comment?.length > 255) errorObj.comment = {color:"red"}
        if(rating === 0) errorObj.rating = "Rate your dining experience (required)"
        setError(errorObj)
    },[rating, comment])
    const handleSubmit = (e) => {
        e.preventDefault();
        const review = {
            user_id:user.id,
            restaurant_id:reservation.restaurantInfo.id,
            rating,
            comment
        }
        
        if(type === 'update') {
            dispatch(fetchupdateReview(review, updateReview?.id)).then(()=>dispatch(fetchSingleRestaurants(reservation.restaurantInfo.id))).then(()=>closeModal())
        }
        else {
            dispatch(fetchaddReview(review, reservation.restaurantInfo.id, user.id)).then(()=>{
                dispatch(fetchSingleRestaurants(reservation.restaurantInfo.id))
            }).then(()=>closeModal())
        }
    }
 
    return (
        <form onSubmit={handleSubmit} className="review-modal-container">
            <div className="review-upper-container">
                {type ==='update' ? <h3>{user.firstName}, update your review at {reservation.restaurantInfo.name}</h3> : <h3>{user.firstName}, how was your experience at {reservation.restaurantInfo.name}</h3>}
                <div>Reservation made on {`${Number(reservationDateStringParts[1])}/${Number(reservationDateStringParts[2])}/${Number(reservationDateStringParts[0])}`}</div>
                <div className="rating-input" style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
                    <div>
                        <i className={rating > 0 ? "fas fa-star" : "far fa-star"} style={{ color: "#da3743" }} onMouseEnter={() => { setRating(1) }} onMouseLeave={() => setRating(rating)} onClick={() => setRating(rating)}></i>
                    </div>
                    <div >
                        <i className={rating > 1 ? "fas fa-star" : "far fa-star"} style={{ color: "#da3743" }} onMouseEnter={() => { setRating(2) }} onMouseLeave={() => setRating(rating)} onClick={() => setRating(rating)}> </i>
                    </div>
                    <div >
                        <i className={rating > 2 ? "fas fa-star" : "far fa-star"} style={{ color: "#da3743" }} onMouseEnter={() => { setRating(3) }} onMouseLeave={() => setRating(rating)} onClick={() => setRating(rating)}></i>
                    </div>
                    <div >
                        <i className={rating > 3 ? "fas fa-star" : "far fa-star"} style={{ color: "#da3743" }} onMouseEnter={() => { setRating(4) }} onMouseLeave={() => setRating(rating)} onClick={() => setRating(rating)}></i>
                    </div>
                    <div >
                        <i className={rating > 4 ? "fas fa-star" : "far fa-star"} style={{ color: "#da3743" }} onMouseEnter={() => { setRating(5) }} onMouseLeave={() => setRating(rating)} onClick={() => setRating(rating)}></i>
                    </div>
                </div>
                <textarea value={comment} onChange={e => setComment(e.target.value)} id="review-textarea-container" />
                <div className="comment-required">
                    <p style={{color:"red"}}>{error.rating && error.rating}</p>
                    <div style={error.comment && error.comment}>{`${comment?.length} / 255 characters`}</div>
                </div>
            </div>
            <div className="review-lower-container">
                <div className="review-button-container">
                    <button type="submit" style={Object.values(error).length > 0 ? {backgroundColor:"#ccc", color:"#666", cursor:"not-allowed"}: null} >{type==='update' ? 'Update' : 'Submit'}</button>
                    <button onClick={() => closeModal()}>Cancel</button>
                </div>
            </div>
        </form>
    )
}