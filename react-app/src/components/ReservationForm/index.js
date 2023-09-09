import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { fetchSingleRestaurants } from "../../store/restaurant";
import {fetchallRestaurantReservations, fetchNewReservation, fetchUpdateReservation} from '../../store/reservation'
import {selectionMapper, convertIntDaytoStringDay, normalizationListOfreservationDateTime, matchingDay, filterTimeMatchDay, filterFinalList, convertTofullDateString, currentSelectionMapper, dateformatConverter } from '../helper'
import '../ReservationForm/ReservationForm.css'
import "react-datepicker/dist/react-datepicker.css";
export const ReservationForm = () => {
    const now = new Date()
    const location = useLocation()
    const type = location.state ? location.state.type : 'create'
    const reservation = location.state ? location.state.reservation : null
    const currentUser = useSelector(state=>state.session.user)
    const history = useHistory()
    const dispatch = useDispatch()
    const {userId, restaurantId} = useParams()
    const [startDate, setStartDate] = useState(type === 'update' ? new Date(reservation.reservationDate) : new Date())
    const [restime, setresTime] = useState(type === 'update' ? reservation.reservationDate.split(' ')[1]: '')
    const [party, setParty] = useState(type === 'update' ? reservation.numGuests : 2)
    const [checker , setChecker] = useState(false)
    
    useEffect(()=>{
        dispatch(fetchSingleRestaurants(restaurantId)).then(()=>dispatch(fetchallRestaurantReservations(restaurantId)))
    },[])
    const restaurant = useSelector(state=>state.restaurant.singleRestaurant)
    const restaurantBusinessHours = restaurant.business_hours
    const reservationsDateTime = Object.values(useSelector(state=>state.reservation.restaurantReservations)).map(reservation => reservation.reservationDate)
    const handleParty = e => {
        setParty(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const data = {
            party,
            reservation_date:dateformatConverter(startDate, restime)
        }
        if(type === 'update') { 
    
            dispatch(fetchUpdateReservation(reservation.id, data)).then(()=>history.push(`/user/${currentUser.id}/reservations`))} 
        else dispatch(fetchNewReservation(restaurantId, currentUser.id, data)).then(()=>history.push(`/user/${currentUser.id}/reservations`))
    }
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
    const listofTime= normalizationListOfreservationDateTime(reservationsDateTime)
    const targetBusinessHour = restaurantBusinessHours?.find(day=>day.day === targetDay)
    const openingTargetBusinessHour = targetBusinessHour?.start
    const closingTargetBusinessHour = targetBusinessHour?.end
    const indexOfopeningHour = selectionMapper().indexOf(openingTargetBusinessHour)
    const indexOfclosingHour = selectionMapper().indexOf(closingTargetBusinessHour)
    const filterBusinessHour = selectionMapper().slice(indexOfopeningHour, indexOfclosingHour+1)
    const resultfromFilter = matchingDay(listofTime, targetYYMMDD)
    if(resultfromFilter) {
       const deleteList = filterTimeMatchDay(reservationsDateTime, startDate)
       filterFinalList(filterBusinessHour, deleteList)
    }
   
    if(fullDateNow === fullDateTarget) {
        const deleteList = currentSelectionMapper()
        filterFinalList(filterBusinessHour, deleteList)
    }
    
  
    if(Number(userId) !== currentUser.id) history.push('/')
    return (
        <div className="reservation-form-container">
           <div>Your current reservation</div>
           <div>
                <img src={restaurant.restaurantPic}/>
                <div>
                    <div>{restaurant.name}</div>
                    <div>
                        <div>{startDate.toString().slice(0,10)}</div>
                        <div></div>
                        <div>{party}</div>
                    </div>
                </div>
           </div>
           <div>Modify your reservation</div>
           <form onSubmit={handleSubmit}>
                <div>
                    <DatePicker selected={startDate} minDate={now} onChange={(date) => setStartDate(date)} /> 
                </div>
                <div className="selection-reservation-container">
                    { filterBusinessHour.length ? <select value={restime} onChange={e=>{
                        setresTime(e.target.value)
                        setChecker(true)
                    }}>{filterBusinessHour.map(time=><option key={time} value={time}>{time}</option>)}</select>: "Not Available"}
                    {type === 'update' && <p>{`Previous Time : ${reservation.reservationDate.split(' ')[1]}`}</p>}
                </div>
                <div className="party-container">
                        <select value={party} onChange={handleParty}>
                            <option value={1}>1 person</option>
                            <option value={2}>2 people</option>
                            <option value={3}>3 people</option>
                            <option value={4}>4 people</option>
                            <option value={5}>5 people</option>
                            <option value={6}>6 people</option>
                            <option value={7}>7 people</option>
                            <option value={8}>8 people</option>
                            <option value={9}>9 people</option>
                            <option value={10}>10 people</option>
                        </select>
                    </div>
                <button disabled={!checker} type="submit">{type ==='update'? 'Update Reservation' : 'Find a new table'}</button>
           </form>
        </div>
    )
}