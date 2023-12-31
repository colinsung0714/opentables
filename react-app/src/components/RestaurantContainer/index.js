import React from "react";
import { useHistory } from 'react-router-dom'
import '../RestaurantContainer/RestaurantContainer.css'
import { StarIcon } from "../StarIcon";
import { AvgPriceIcon } from "../AvgPriceIcon";
import { useSelector } from "react-redux";
import { selectionMapper, convertIntDaytoStringDay, normalizationListOfreservationDateTime, matchingDay, filterTimeMatchDay, filterFinalList, convertTofullDateString, currentSelectionMapper, dateformatConverter } from '../helper'
import LoginFormModal from "../LoginFormModal";
import { useModal } from '../../context/Modal';
import { anHourMapper } from "../helper";
export const RestaurantContainer = ({ restaurant, reservations, startDate, time }) => {
    const history = useHistory()
    const movetoRestaurantDetail = (id) => {
        history.push(`/restaurants/${id}`)
    }
    const { setModalContent } = useModal();
    const currentUser = useSelector(state=>state.session.user)
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const userTime = new Date().toLocaleString("en-US", {timeZone:userTimeZone})
    const now = new Date(userTime)
    const restaurantBusinessHours = restaurant.business_hours
    const reservationsDateTime = reservations.filter(reservation => reservation.restaurantId === restaurant.id).map(reservation => reservation.reservationDate)
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
    let recommendTime;
    if(filterBusinessHour) recommendTime = anHourMapper(filterBusinessHour, time)

    return (
        <div onClick={() => movetoRestaurantDetail(restaurant.id)} className="single-restaurant-container">
            <div className="img-container"><img src={restaurant.restaurantPic} alt={restaurant.restaurantPic} /></div>
            <div style={{fontWeight:'bold', wordBreak:"break-all"}}>{restaurant.name}</div>
            <div className="restaurant-middle-container">
                <div>
                    <div style={{width:"90px"}}><StarIcon avgRating={restaurant.avgRating} /></div>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <div style={{width:"100%"}}>{restaurant.categories}</div>
                        <div id="avgPriceIcon-container"><AvgPriceIcon avgPrice={restaurant.avgPrice} /></div>
                    </div>
                </div>
                <div>
                    <div>{restaurant.reviewNum === 0 ? 'New' : restaurant.reviewNum === 1 ? `${restaurant.reviewNum}  review` : `${restaurant.reviewNum} reviews`}</div>
                    <div style={{display:"flex",gap:"5px"}}> <i className="fas fa-circle" style={{color: "#041839", fontSize:"10px", paddingTop:"6px", alignSelf:"flex-start"}}></i><div style={{width:"100%", wordBreak:"break-word"}}>{restaurant.city}</div></div>
                </div>
            </div>
            <div id='recommend-time-button-container' style={{display:"flex", gap:"5px"}}>
                {recommendTime?.length ? recommendTime.map(time => <button onClick={(e)=>{
                    e.stopPropagation()
                    if(currentUser) {
                        history.push(`/user/${currentUser.id}/restaurants/${restaurant.id}/reservations/new`)
                    } else {
                        setModalContent(<LoginFormModal/>)
                    }
            }} key={time}>{time}</button>) : <div style={{padding:"16px 0", fontWeight:"bold", color:"#da3743"}}>Not Available</div>}
            </div>
        </div>
    )
}