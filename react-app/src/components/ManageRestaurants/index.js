import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import "../ManageRestaurants/ManageRestaurants.css"
import { UserNavigation } from "../UserNavigation"
import { fetchAllRestaurants, fetchDelteRestaurant } from "../../store/restaurant"
import { StarIcon } from '../StarIcon'
export const ManageRestaurants = () => {
    const currentUser = useSelector(state => state.session.user)
    const { userId } = useParams()
    const history = useHistory()
    const ownRestaurants = Object.values(useSelector(state => state.restaurant.allRestaurants)).filter(restaurant => restaurant.ownerId === Number(userId))
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAllRestaurants())
    }, [])
    const handleUpdate = (restaurantId) => {
        history.push(`/restaurants/new`, {type:'update', restaurantId})
    }
    const handleDelete = (restaurantId) => {
        dispatch(fetchDelteRestaurant(restaurantId))
    }
    if(!ownRestaurants.length) return null
    return (
        <div>
            <UserNavigation currentUser={currentUser} />
            <div className="restaurants-manage-container">
                <h2>My Restaurants</h2>
                {ownRestaurants.map(restaurant =>
                    <div className='restaurant-manage' key={restaurant.id}>
                        <div className="left-manage">
                            <img src={restaurant.restaurantPic} />
                            <div>
                                <div>{restaurant.name}</div>
                                <StarIcon avgRating={restaurant.avgRating} />
                                <div className="categories-city-container">
                                    <div style={{ borderRight: "2px solid #d8d9db", paddingRight: "10px" }}>{restaurant.categories}</div>
                                    <div>{restaurant.city}</div>
                                </div>
                            </div>
                        </div>
                        <div className="manage-button-container">
                            <button onClick={()=>handleUpdate(restaurant.id)}>Update</button>
                            <button onClick={()=>handleDelete(restaurant.id)}>Delete</button>
                        </div>
                    </div>)}
            </div>
        </div>
    )
}