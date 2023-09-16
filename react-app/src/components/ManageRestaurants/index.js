import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import "../ManageRestaurants/ManageRestaurants.css"
import { UserNavigation } from "../UserNavigation"
import { fetchAllRestaurants } from "../../store/restaurant"
import { StarIcon } from '../StarIcon'
import { sortList } from "../helper"
import OpenModalButton from "../OpenModalButton";
import { DeleteModalButton } from "../DeleteModalButton"
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
        history.push(`/restaurants/new`, { type: 'update', restaurantId })
    }
    if (Number(userId) !== currentUser.id) history.push('/')
    return (
        <div>
            <UserNavigation currentUser={currentUser} type={'restaurants'} />
            <div className="restaurants-manage-container">
                <h2>My Restaurants</h2>
                {!ownRestaurants.length && <div style={{ margin: "20px 0" }}>There is no restaurant</div>}
                {sortList(ownRestaurants).map(restaurant =>
                    <div className='restaurant-manage' key={restaurant.id}>
                        <div className="left-manage">
                            <img src={restaurant.restaurantPic} />
                            <div className="restaurant-info-detail-icon-container">
                                <h3 style={{wordBreak:"break-all"}}>{restaurant.name}</h3>
                                <StarIcon avgRating={restaurant.avgRating} />
                                <div className="categories-city-container">
                                    <div style={{ borderRight: "2px solid #d8d9db", paddingRight: "10px" }}>{restaurant.categories}</div>
                                    <div>{restaurant.city}</div>
                                </div>
                            </div>
                        </div>
                        <div className="manage-button-container">
                            <button onClick={() => handleUpdate(restaurant.id)}>Update</button>
                            <OpenModalButton
                                className='restaurant-delete-button'
                                buttonText="Delete"
                                modalComponent={<DeleteModalButton restaurant={restaurant} type={'restaurant'} />}
                            />
                        </div>
                    </div>)}
                <div id="empty-space" style={{ height: "50px" }}></div>
            </div>
        </div>
    )
}