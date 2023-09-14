import React from "react";
import { StarIcon } from "../StarIcon";
import { dateCalculatortoString } from "../helper";
import { useSelector } from "react-redux";
import "../ReviewContainer/ReviewContainer.css"
import OpenModalButton from "../OpenModalButton";
import { NewReviewFormModal } from '../NewReviewFormModal'
import { DeleteReviewModal } from "../DeleteReviewModal";
export const ReviewContainer = ({ review}) => {
    const currentUser = useSelector(state => state.session.user)
    const reservation = Object.values(useSelector(state => state.reservation.restaurantReservations)).find(reserv => reserv.userId === currentUser?.id)
  
    return (
        <div className="single-review-container">
            <div className="single-review-left-container">
                <img src={review.user.profilePic}></img>
                <div>{review.user.username}</div>
                <div className="single-review-left-icon-container"><i className="far fa-comment-alt" /><div>{review.user?.reviewNum === 1 ? `${review.user?.reviewNum} review` : `${review.user?.reviewNum} reviews`}</div></div>
            </div>
            <div className="single-review-right-container">
                <div className="single-review-right-icon-container">
                    <StarIcon avgRating={review.rating} />
                    <div>{dateCalculatortoString(review.createAt)}</div>
                </div>
                <div>
                    {review.comment}
                </div>
            </div>
            <div style={{display:"flex", alignItems:"center"}}>
                {
                    review?.userId === currentUser?.id &&   <div id="update-delete-review-buttons">
                        <OpenModalButton
                            className='review-update-button'
                            buttonText="Update"
                            modalComponent={<NewReviewFormModal type={'update'} reservation={reservation} user={currentUser} />}
                        />
                         <OpenModalButton
                            className='review-delete-button'
                            buttonText="Delete"
                            modalComponent={<DeleteReviewModal review={review}/>}
                        />
                    </div>
                }
            </div>
        </div>
    )
}