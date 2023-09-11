import React, { useEffect } from "react";
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
export const RestaurantDetail = () => {
    const { restaurantId } = useParams()
    const key = useSelector((state) => state.maps.key);
    const currentUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const histroy = useHistory()
    const { setModalContent, setOnModalClose } = useModal();
    const restaurant = useSelector(state => state.restaurant.singleRestaurant)
    useEffect(() => {
        if (!key) {
            dispatch(getKey());
        }
        dispatch(fetchSingleRestaurants(restaurantId))
    }, [])

    if (!key) {
        return null;
    }
    const handleClick = () => {
        if (currentUser) histroy.push(`/user/${currentUser.id}/restaurants/${restaurantId}/reservations/new`)
        else setModalContent(<LoginFormModal/>)
    }




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
                    <button onClick={() => handleClick()}>Find a Time</button>
                    <Maps apiKey={key} lat={restaurant.lat} lng={restaurant.lng} title={restaurant.name} />
                </div>
            </div>

        </div>
    )
}