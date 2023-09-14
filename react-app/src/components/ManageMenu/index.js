import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { UserNavigation } from "../UserNavigation"
import { fetchAllRestaurants } from "../../store/restaurant"
import { StarIcon } from '../StarIcon'
import { sortList } from "../helper"
import '../ManageMenu/ManageMenu.css'

export const ManageMenu = () => {
    const currentUser = useSelector(state => state.session.user)
    const { userId } = useParams()
    const history = useHistory()
    const ownRestaurants = Object.values(useSelector(state => state.restaurant.allRestaurants)).filter(restaurant => restaurant.ownerId === Number(userId))
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAllRestaurants())
    }, [])

    if (Number(userId) !== currentUser.id) history.push('/')
    return (
        <div>
            <UserNavigation currentUser={currentUser} type={'menus'} />
            <div className="restaurants-manage-container">
                <h2>My Menus</h2>
                {!ownRestaurants.length && <div style={{ margin: "20px 0" }}>There is no restaurant</div>}
                {sortList(ownRestaurants).map(restaurant =>
                    <div className='restaurant-manage' key={restaurant.id}>
                        <div className="left-manage">
                            <img src={restaurant.restaurantPic} />
                            <div className="restaurant-info-detail-icon-container">
                                <h3>{restaurant.name}</h3>
                                <StarIcon avgRating={restaurant.avgRating} />
                                <div className="categories-city-container">
                                    <div style={{ borderRight: "2px solid #d8d9db", paddingRight: "10px" }}>{restaurant.categories}</div>
                                    <div>{restaurant.city}</div>
                                </div>
                            </div>
                        </div>
                        <div className="manage-button-container">
                            {
                                restaurant.menus.length > 0 ?
                                    <div className="spec-manage-button-container">
                                        <button onClick={() => history.push(`/restaurants/${restaurant.id}/menus`, { restaurant, type: "update" })}>Update Menu</button>
                                        <button onClick={() => history.push(`/restaurants/${restaurant.id}/menus`)}>Delete Menu</button>
                                    </div>
                                    :
                                    <div className="spec-manage-button-container">
                                        <button onClick={() => history.push(`/restaurants/${restaurant.id}/menus`, { restaurant, type: "create" })}>New Menu</button>
                                        <button onClick={() => history.push(`/restaurants/${restaurant.id}/menus`)}>Delete Menu</button>
                                    </div>
                            }
                        </div>
                    </div>)}
                <div id="empty-space" style={{ height: "50px" }}></div>
            </div>
        </div>
    )
}