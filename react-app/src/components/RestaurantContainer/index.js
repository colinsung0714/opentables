import React from "react";
import { useHistory } from 'react-router-dom'
import '../RestaurantContainer/RestaurantContainer.css'
import { StarIcon } from "../StarIcon";
import { AvgPriceIcon } from "../AvgPriceIcon";
import { useSelector } from "react-redux";
import { selectionMapper, convertIntDaytoStringDay, normalizationListOfreservationDateTime, matchingDay, filterTimeMatchDay, filterFinalList, convertTofullDateString, currentSelectionMapper, dateformatConverter } from '../helper'
export const RestaurantContainer = ({ restaurant, reservations }) => {
    const history = useHistory()
    const movetoRestaurantDetail = (id) => {
        history.push(`/restaurants/${id}`)
    }
    
    const currentUser = useSelector(state=>state.session.user)
    const now = new Date()
    const restaurantBusinessHours = restaurant.business_hours
    const reservationsDateTime = reservations.filter(reservation => reservation.restaurantId === restaurant.id).map(reservation => reservation.reservationDate)
    const startDate = new Date()
    const nowDate = now.getDate()
    const nowMonth = now.getMonth()
    const nowYear = now.getFullYear()
    const targetDay = convertIntDaytoStringDay(startDate)
    const targetDate = startDate.getDate()
    const targetMonth = startDate.getMonth()
    const targetYear = startDate.getFullYear()
    const fullDateNow = convertTofullDateString(nowYear, nowMonth, nowDate)
    const fullDateTarget = convertTofullDateString(targetYear, targetMonth, targetDate)
    const targetYYMMDD = new Date(targetYear, targetMonth, targetDate).toString()
    const listofTime = normalizationListOfreservationDateTime(reservationsDateTime)
    const targetBusinessHour = restaurantBusinessHours?.find(day => day.day === targetDay)
    const openingTargetBusinessHour = targetBusinessHour?.start
    const closingTargetBusinessHour = targetBusinessHour?.end
    const indexOfopeningHour = selectionMapper().indexOf(openingTargetBusinessHour)
    const indexOfclosingHour = selectionMapper().indexOf(closingTargetBusinessHour)
    const filterBusinessHour = selectionMapper().slice(indexOfopeningHour, indexOfclosingHour + 1)
    const resultfromFilter = matchingDay(listofTime, targetYYMMDD)
    if (resultfromFilter) {
        const deleteList = filterTimeMatchDay(reservationsDateTime, startDate)
        filterFinalList(filterBusinessHour, deleteList)
    }

    if (fullDateNow === fullDateTarget) {
        const deleteList = currentSelectionMapper()
        filterFinalList(filterBusinessHour, deleteList)
    }

    
    return (
        <div onClick={() => movetoRestaurantDetail(restaurant.id)} className="single-restaurant-container">
            <div><img src={restaurant.restaurantPic} /></div>
            <div>{restaurant.name}</div>
            <div className="restaurant-middle-container">
                <div>
                    <div><StarIcon avgRating={restaurant.avgRating} /></div>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <div>{restaurant.categories}</div>
                        <div><AvgPriceIcon avgPrice={restaurant.avgPrice} /></div>
                    </div>
                </div>
                <div>
                    <div>{restaurant.reviewNum === 0 ? 'New' : restaurant.reviewNum === 1 ? `${restaurant.reviewNum}  review` : `${restaurant.reviewNum} reviews`}</div>
                    <div>{restaurant.city}</div>
                </div>
            </div>
            <div style={{display:"flex", gap:"5px"}}>
                {filterBusinessHour.length ? filterBusinessHour.slice(0, 3).map(time => <button onClick={(e)=>{
                    e.stopPropagation()
                    history.push(`/user/${currentUser.id}/restaurants/${restaurant.id}/reservations/new`)
            }} key={time}>{time}</button>) : <div style={{padding:"16px"}}>Not Available for today</div>}
            </div>
        </div>
    )
}