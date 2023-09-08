import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleRestaurants } from "../../store/restaurant";
import '../RestaurantDetail/RestaurantDetail.css'
import {AvgPriceIcon} from '../AvgPriceIcon'
import {StarIcon} from '../StarIcon'
export const RestaurantDetail = () => {
    const { restaurantId } = useParams()
    const dispatch = useDispatch()
    const restaurant = useSelector(state => state.restaurant.singleRestaurant)
    useEffect(() => {
        dispatch(fetchSingleRestaurants(restaurantId))
    }, [])


    return (
        <div className="restaurant-detail-container">
            <div style={{width:"100%", margin:"0 250px"}}>
                <img style={{ width: "100%", height: "500px" }} src={restaurant.restaurantPic} />
            </div>
            <div className='restaurant-info-container' style={{display:"flex", flexDirection:'column', backgroundColor:"white", width:"50%"}}>
                <div className="nav-restaurant-detail-container">
                    <div>Overview</div>
                    <div>Experiences</div>
                    <div>Popular dishes</div>
                    <div>Photos</div>
                    <div>Menu</div>
                    <div>Review</div>
                </div>
                <div>
                    <div>
                    {restaurant.name}
                    </div>
                    <div>
                        <div><StarIcon avgRating={restaurant.avgRating}/><div>{restaurant.avgRating}</div></div>
                        <div><i className="far fa-comment-alt"></i>{restaurant.reviewNum}</div>
                        <div><i className="far fa-money-bill-alt"></i><AvgPriceIcon avgPrice={restaurant.avgPrice}/></div>
                        <div><i className="fas fa-utensils"></i>{restaurant.categories}</div>
                    </div>
                    <div>
                        {restaurant.description}
                    </div>
                </div>
            </div>
        </div>
    )
}