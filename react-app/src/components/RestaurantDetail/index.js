import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleRestaurants } from "../../store/restaurant";
import { getKey } from "../../store/maps";
import '../RestaurantDetail/RestaurantDetail.css'
import { AvgPriceIcon } from '../AvgPriceIcon'
import { StarIcon } from '../StarIcon'
import Maps from "../Maps";
import LoginFormModal from "../LoginFormModal";
import { useModal } from '../../context/Modal';
import { ReviewContainer } from "../ReviewContainer";
import { sortList, sortHighest, sortLowest } from "../helper";
import { fetchReviewRestaurant } from "../../store/review";
import {fetchallRestaurantReservations} from '../../store/reservation'

export const RestaurantDetail = () => {
    const { restaurantId } = useParams()
    const [activeReview, setActiveReview] = useState(false)
    const [activeOverview, setActiveOverview] = useState(true)
    const [sortVal, setSortVal] = useState('newest')
    const key = useSelector((state) => state.maps.key);
    const currentUser = useSelector(state => state.session.user)
    const reviews = Object.values(useSelector(state=>state.review.restaurantReviews))
    const dispatch = useDispatch()
    const histroy = useHistory()
    const { setModalContent, setOnModalClose } = useModal();
    const restaurant = useSelector(state => state.restaurant.singleRestaurant)
    useEffect(() => {
        if (!key) {
            dispatch(getKey());
        }
        dispatch(fetchSingleRestaurants(restaurantId)).then(()=>dispatch(fetchReviewRestaurant(restaurantId))).then(()=>dispatch(fetchallRestaurantReservations(restaurantId)))
        
    
    }, [])
  
    if (!key) {
        return null;
    }
    const handleClick = () => {
        if (currentUser) histroy.push(`/user/${currentUser.id}/restaurants/${restaurantId}/reservations/new`)
        else setModalContent(<LoginFormModal />)
    }

    const handleOverview = () => {
        setActiveOverview(prev => !prev)
        setActiveReview(prev => !prev)
    }

    const handleReview = () => {
        setActiveOverview(prev => !prev)
        setActiveReview(prev => !prev)
    }
  
    return (
        <div className="restaurant-detail-container">
            <div style={{ width: "100%", margin: "0 250px" }}>
                <img style={{ width: "100%", height: "500px" }} src={restaurant.restaurantPic} />
            </div>
            <div className='restaurant-info-container' id="retaurant-info-detail">
                <div className="restaurant-info">
                    <div className="nav-restaurant-detail-container">
                        <a onClick={handleOverview} href="#retaurant-info-detail" style={activeOverview ? { textDecoration: "none", color: "#da3743", borderBottom: "solid 2px #da3743" } : { textDecoration: "none", color: "black" }}>Overview</a>
                        <div>Photos</div>
                        <div>Menu</div>
                        <a onClick={handleReview} href="#review-section" style={activeReview ? { textDecoration: "none", color: "#da3743", borderBottom: "solid 2px #da3743" } : { textDecoration: "none", color: "black" }}>Review</a>
                    </div>
                    <div className="detail-restaurant-info">
                        <h1>
                            {restaurant.name}
                        </h1>
                        <div className="detail-restaurant-icons-container">
                            <div className="rating-comment-detail-container">
                                <div id="star-icon-restaurant-container"><StarIcon avgRating={restaurant.avgRating} /><div>{Number(restaurant.avgRating) === 0 ? 'No Rating' : restaurant.avgRating}</div></div>
                                <div id="comment-restaurant-icon-container"><i className="far fa-comment-alt"></i>{restaurant.reviewNum === 0 ? "No Review" : restaurant.reviewNum === 1 ? `${restaurant.reviewNum} Review` : `${restaurant.reviewNum} Reviews`}</div>
                            </div>
                            <div className="money-type-detail-container">
                                <div id="money-restaurant-icon-container"><i className="far fa-money-bill-alt"></i><AvgPriceIcon avgPrice={restaurant.avgPrice} /></div>
                                <div id="type-restaurant-icon-container"><i className="fas fa-utensils"></i>{restaurant.categories}</div>
                            </div>
                        </div>
                        <div>
                            {restaurant.description}
                        </div>
                        <div id="num-reviews-sort-container">
                            <div style={{ fontWeight: "bold" }}>{restaurant.reviewNum === 0 ? "Visit this restaurant and be the first to make a review" : restaurant.reviewNum === 1 ? `${restaurant.reviewNum} Review` : `${restaurant.reviewNum} Reviews`}</div>
                            <div>
                                {
                                    restaurant.reviewNum > 0 && <select value={sortVal} onChange={(e) => setSortVal(e.target.value)}>
                                        <option value={'newest'}>Newest</option>
                                        <option value={'highest'}>Higest Rating</option>
                                        <option value={'lowest'}>Lowest Rating</option>
                                    </select>
                                }
                            </div>
                        </div>
                        <div style={{ marginTop: '10px' }} id="review-section">
                            {
                                sortVal === 'newest' && sortList(reviews)?.map(review => <ReviewContainer key={review.id} review={review} />)
                            }
                            {
                                sortVal === 'highest' && sortHighest(reviews)?.map(review => <ReviewContainer key={review.id} review={review} />)
                            }
                            {
                                sortVal === 'lowest' && sortLowest(reviews)?.map(review => <ReviewContainer key={review.id} review={review} />)
                            }
                            <div id="empty-space" style={{ height: "50px" }}></div>
                        </div>
                    </div>
                </div>
                <div className="restaurant-reservation-container">
                    <div style={{ fontWeight: "bold" }}>Make a Reservation</div>
                    <button onClick={() => handleClick()}>Find a Time</button>
                    <Maps apiKey={key} lat={restaurant.lat} lng={restaurant.lng} title={restaurant.name} />
                </div>
            </div>

        </div>
    )
}