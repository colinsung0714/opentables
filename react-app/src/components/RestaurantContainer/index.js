import React from "react";
import { useHistory } from 'react-router-dom'
import '../RestaurantContainer/RestaurantContainer.css'
import { StarIcon } from "../StarIcon";
import { AvgPriceIcon } from "../AvgPriceIcon";
export const RestaurantContainer = ({ restaurant }) => {
    const history = useHistory()
   
    const movetoRestaurantDetail = (id) => {
        history.push(`/restaurants/${id}`)
    }
    return (
        <div onClick={() => movetoRestaurantDetail(restaurant.id)} className="single-restaurant-container">
            <div><img src={restaurant.restaurantPic} /></div>
            <div>{restaurant.name}</div>
            <div className="restaurant-middle-container">
                <div>
                    <div><StarIcon avgRating={restaurant.avgRating} /></div>
                    <div style={{display:'flex', gap:'5px'}}>
                        <div>{restaurant.categories}</div>
                        <div><AvgPriceIcon avgPrice={restaurant.avgPrice}/></div>
                    </div>
                </div>
                <div>
                    <div>{restaurant.reviewNum === 0 ? 'New' : restaurant.reviewNum === 1 ? `${restaurant.reviewNum}  review` : `${restaurant.reviewNum} reviews`}</div>
                    <div>{restaurant.city}</div>
                </div>
            </div>
        </div>
    )
}