import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleRestaurants } from "../../store/restaurant";
import '../RestaurantDetail/RestaurantDetail.css'
import { AvgPriceIcon } from '../AvgPriceIcon'
import { StarIcon } from '../StarIcon'
export const RestaurantDetail = () => {
    const { restaurantId } = useParams()
    const currentUser = useSelector(state=>state.session.user)
    const dispatch = useDispatch()
    const histroy = useHistory()
    const restaurant = useSelector(state => state.restaurant.singleRestaurant)
    useEffect(() => {
        dispatch(fetchSingleRestaurants(restaurantId))
    }, [])


    return (
        <div className="restaurant-detail-container">
            <div style={{ width: "100%", margin: "0 250px" }}>
                <img style={{ width: "100%", height: "500px" }} src={restaurant.restaurantPic} />
            </div>
            <div className='restaurant-info-container'>
                <div className="restaurant-info">
                    <div className="nav-restaurant-detail-container">
                        <div>Overview</div>
                        <div>Photos</div>
                        <div>Menu</div>
                        <div>Review</div>
                    </div>
                    <div className="detail-restaurant-info">
                        <h1>
                            {restaurant.name}
                        </h1>
                        <div className="detail-restaurant-icons-container">
                            <div id="star-icon-restaurant-container"><StarIcon avgRating={restaurant.avgRating} /><div>{restaurant.avgRating}</div></div>
                            <div id="comment-restaurant-icon-container"><i className="far fa-comment-alt"></i>{restaurant.reviewNum}</div>
                            <div id="money-restaurant-icon-container"><i className="far fa-money-bill-alt"></i><AvgPriceIcon avgPrice={restaurant.avgPrice} /></div>
                            <div id="type-restaurant-icon-container"><i className="fas fa-utensils"></i>{restaurant.categories}</div>
                        </div>
                        <div>
                            {restaurant.description}
                        </div>
                    </div>
                </div>
                <div className="restaurant-reservation-container">
                    <div>Make a Reservation</div>
                    <button onClick={()=>histroy.push(`/user/${currentUser.id}/restaurants/${restaurantId}/reservations/new`)}>Find a Time</button>
                </div>
            </div>
        </div>
    )
}