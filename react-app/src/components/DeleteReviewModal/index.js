import React from "react";
import { useDispatch } from "react-redux";
import { fetchSingleRestaurants } from "../../store/restaurant";
import { fetchDeleteReview } from "../../store/review";
import { useModal } from "../../context/Modal";
import '../DeleteReviewModal/DeleteReviewModal.css'
export const DeleteReviewModal = ({review}) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(fetchDeleteReview(review.id, review.restaurantId)).then(()=>dispatch(fetchSingleRestaurants(review.restaurantId))).then(()=>closeModal())
    }

    return (
        <div className="delte-review-container">
            <div className="delete-review-upper-container"><img src='https://opentables.s3.us-west-1.amazonaws.com/onetableicon.png' /><h2>Open Tables</h2></div>
            <div className="delete-review-lower-container">
                <h3>Are you sure to delete your review?</h3>
                <div className="confirm-button-delete-review-container">
                    <button onClick={() =>handleClick()}>Yes</button>
                    <button onClick={() => closeModal()}>No</button>
                </div>
            </div>
        </div>
    )
}