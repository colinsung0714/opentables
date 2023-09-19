import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from "../../context/Modal";
import '../NewReviewFormModal/NewReviewFormModal.css'
import { fetchSingleRestaurants } from "../../store/restaurant";
import { fetchaddReview, fetchupdateReview, fetchReviewRestaurant } from "../../store/review";
import Carousel from 'react-multi-carousel';
import { useDropzone } from 'react-dropzone'
import 'react-multi-carousel/lib/styles.css';
export const NewReviewFormModal = ({ reservation, user, type }) => {
    let updateReview = Object.values(useSelector(state => state.review.restaurantReviews)).find(rev => rev.userId == user.id)
    if (!updateReview) updateReview = Object.values(reservation.restaurantInfo.reviews).find(rev => rev.userId == user.id)
    const { setModalContent, setOnModalClose, closeModal } = useModal();
    const [rating, setRating] = useState(type === 'update' ? updateReview?.rating : 0)
    const [comment, setComment] = useState(type === 'update' ? updateReview?.comment : '')
    const [error, setError] = useState({})
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)
    const [imagesUrls, setImagesUrls] = useState(type === 'update' ? updateReview?.reviewImages.map(prevReview => prevReview.url) : [])
    const dispatch = useDispatch()
    const onDrop = useCallback(acceptedFiles => {
        setImages(acceptedFiles)
        const tempImageUrls = [];
        acceptedFiles.forEach((file) => {
            const url = URL.createObjectURL(file);
            tempImageUrls.push(url);
        });
        setImagesUrls(tempImageUrls);
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ accept: {
        'image/*': []
      }, noClick:true, onDrop, noDragEventsBubbling:true})

    const reservationDateStringParts = reservation.reservationDate.split(' ')[0].split('-')
    useEffect(() => {
        const errorObj = {}
        if (comment?.length === 0) errorObj.length = 'error'
        if (comment?.length > 255) errorObj.comment = { color: "red" }
        if (rating === 0) errorObj.rating = "Rate your dining experience (required)"
        setError(errorObj)
    }, [rating, comment])
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user.id, reservation.restaurantInfo.id, rating, comment, images)
        const formData = new FormData()
        formData.append('user_id', user.id)
        formData.append('restaurant_id', reservation.restaurantInfo.id)
        formData.append('rating', rating)
        formData.append('comment', comment)
        if (images?.length) {
            for (let el of images) {
                formData.append('review_images', el)
            }
        }
        if (type === 'update') {
            setLoading(true)
            dispatch(fetchupdateReview(formData, updateReview?.id)).then(() => dispatch(fetchSingleRestaurants(reservation.restaurantInfo.id))).then(() => dispatch(fetchReviewRestaurant(reservation.restaurantId))).then(() => closeModal())
        }
        else {
            setLoading(true)
            dispatch(fetchaddReview(formData, reservation.restaurantInfo.id, user.id)).then(() => dispatch(fetchSingleRestaurants(reservation.restaurantInfo.id))).then(() => dispatch(fetchReviewRestaurant(reservation.restaurantId))).then(() => closeModal())
        }
    }

 
    const responsive = {

        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        }
    };

    return (
        <form encType="multipart/form-data" onSubmit={handleSubmit} className="review-modal-container">
            <div className="review-upper-container">
         
                {type === 'update' ? <h3>{user.firstName}, update your review at {reservation.restaurantInfo.name}</h3> : <h3>{user.firstName}, how was your experience at {reservation.restaurantInfo.name}</h3>}
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
                    <p style={{ color: "red" }}>{error.rating && error.rating}</p>
                    <div style={error.comment && error.comment}>{`${comment?.length} / 255 characters`}</div>
                </div>
                <div>
                    <label style={{ width: '100%', display: "flex", flexDirection: "column", gap: "10px" }}>
                        <div>Review Picture</div>
                        <div className="drag-drop-pic-piclist-container">
                                        <div id="drag-drop-pic-container" {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            {
                                                isDragActive ?
                                                    <p style={{ color: "#2684ff" }}>Drop the images here ...</p> :
                                                    <p>Drag 'n' drop some images here, or click to select images</p>
                                            }
                                        </div>

                                    </div>
                    </label>
                    <div style={{ width: "600px", paddingTop: "10px" }}>
                        {imagesUrls?.length > 0 && <Carousel responsive={responsive}>
                            {imagesUrls.map(el => <img style={{ width: "150px", height: "150px", borderRadius: "10px" }} src={el} key={el} />)}
                        </Carousel>}

                    </div>
                </div>

            </div>
            <div className="review-lower-container">
            {loading && <div style={{ display: "flex", gap: "20px", justifyContent: "center", alignItems: "center", padding:"20px" }}>
                    <i id="loading-circle" className="fas fa-circle-notch" style={{ color: '#2b46b6' }}></i>
                    <p style={{ fontWeight: "bold" }}>Please wait...</p>
                </div>}
                <div className="review-button-container">
                    <button type="submit" style={Object.values(error).length > 0 ? { backgroundColor: "#ccc", color: "#666", cursor: "not-allowed" } : null} >{type === 'update' ? 'Update' : 'Submit'}</button>
                    <button onClick={() => closeModal()}>Cancel</button>
                </div>
            </div>
        </form>
    )
}