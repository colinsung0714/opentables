import React from "react";
import { StarIcon } from "../StarIcon";
import { dateCalculatortoString } from "../helper";
import { useSelector } from "react-redux";
import "../ReviewContainer/ReviewContainer.css"
import OpenModalButton from "../OpenModalButton";
import { NewReviewFormModal } from '../NewReviewFormModal'
import { DeleteReviewModal } from "../DeleteReviewModal";
import { useModal } from '../../context/Modal';
import { ImageOpenModal } from "../ImageOpenModal";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
export const ReviewContainer = ({ review }) => {
    const currentUser = useSelector(state => state.session.user)
    const { setModalContent, setOnModalClose } = useModal();
    const reservation = Object.values(useSelector(state => state.reservation.restaurantReservations)).find(reserv => reserv.userId === currentUser?.id)
    const responsive = {

        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        }
    };
    const handleImgClick = (e, url) => {
        e.stopPropagation()
        setModalContent(<ImageOpenModal url={url}/>)
    }
    return (
        <div className="whole-single-review-container">
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
                    <div style={{wordBreak:"break-all"}}>
                        {review.comment}
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    {
                        review?.userId === currentUser?.id && <div id="update-delete-review-buttons">
                            <OpenModalButton
                                className='review-update-button'
                                buttonText="Update"
                                modalComponent={<NewReviewFormModal type={'update'} reservation={reservation} user={currentUser} />}
                            />
                            <OpenModalButton
                                className='review-delete-button'
                                buttonText="Delete"
                                modalComponent={<DeleteReviewModal review={review} />}
                            />
                        </div>
                    }
                </div>
            </div>
            <div style={{ width: "350px" }}>{
             review.reviewImages?.length > 0 &&   <Carousel responsive={responsive}>
                    {review.reviewImages.map(el => <img onClick={e=>handleImgClick(e, el.url)} style={{ width: "100px", height: "100px", borderRadius: "10px" , cursor:"pointer"}} src={el.url} key={el.id} />)}
                </Carousel>
            }</div>
        </div>
    )
}