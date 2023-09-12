import React from "react";
import { StarIcon } from "../StarIcon";
import { dateCalculatortoString } from "../helper";
import "../ReviewContainer/ReviewContainer.css"
export const ReviewContainer = ({ review, key }) => {
   
    return (
        <div key={key} className="single-review-container">
            <div className="single-review-left-container">
                <img src={review.user.profilePic}></img>
                <div>{review.user.username}</div>
                <div className="single-review-left-icon-container"><i className="far fa-comment-alt" /><div>{review.user?.reviewNum === 1 ? `${review.user?.reviewNum} review` :`${review.user?.reviewNum} reviews` }</div></div>
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
        </div>
    )
}