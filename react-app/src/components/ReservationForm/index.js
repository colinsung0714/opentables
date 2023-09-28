import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { fetchSingleRestaurants } from "../../store/restaurant";
import { fetchallRestaurantReservations, fetchNewReservation, fetchUpdateReservation } from '../../store/reservation'
import { selectionMapper, convertIntDaytoStringDay, normalizationListOfreservationDateTime, matchingDay, filterTimeMatchDay, filterFinalList, convertTofullDateString, currentSelectionMapper, dateformatConverter, parseDirection } from '../helper'
import '../ReservationForm/ReservationForm.css'
import "react-datepicker/dist/react-datepicker.css";
import Maps from "../Maps";


export const ReservationForm = () => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const userTime = new Date().toLocaleString("en-US", { timeZone: userTimeZone })
    const now = new Date(userTime)
    const location = useLocation()
    const type = location.state ? location.state.type : 'create'
    const reservation = location.state ? location.state.reservation : null
    const currentUser = useSelector(state => state.session.user)
    const history = useHistory()
    const dispatch = useDispatch()
    const { userId, restaurantId } = useParams()
    const [startDate, setStartDate] = useState(type === 'update' ? new Date(reservation.reservationDate) : new Date())
    const [restime, setresTime] = useState(type === 'update' ? reservation.reservationDate.split(' ')[1] : '')
    const [party, setParty] = useState(type === 'update' ? reservation.numGuests : 2)
    const [checker, setChecker] = useState(false)
    const [error, setError] = useState({})
    const [steps, setSteps] = useState([])
 
    
    const apiKey = useSelector(state => state.maps.key)
    useEffect(() => {
        dispatch(fetchSingleRestaurants(restaurantId)).then(() => dispatch(fetchallRestaurantReservations(restaurantId)))
    }, [])
    const restaurant = useSelector(state => state.restaurant.singleRestaurant)
    const restaurantBusinessHours = restaurant.business_hours
    const reservationsDateTime = Object.values(useSelector(state => state.reservation.restaurantReservations)).map(reservation => reservation.reservationDate)
    const handleParty = e => {
        setParty(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            party,
            reservation_date: dateformatConverter(startDate, restime)
        }
        if (type === 'update') {

            dispatch(fetchUpdateReservation(reservation.id, data)).then(() => history.push(`/user/${currentUser.id}/reservations`)).catch(e => setError(e.error))
            setError({})
        }
        else {
            dispatch(fetchNewReservation(restaurantId, currentUser.id, data)).then(() => history.push(`/user/${currentUser.id}/reservations`)).catch(e => setError(e.error))
            setError({})
        }
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
   
    if (Number(userId) !== currentUser.id) history.push('/')
    
    return (
        <div className="reservation-form-container">
            <div className="reservation-form-right">
                <div id="reservation-package-box">
                {type === 'update' ? <h2 style={{ textAlign: "start", paddingBottom: "30px" }}>Your current reservation</h2> : <h2 style={{ textAlign: "start", paddingBottom: "30px" }}>New reservation</h2>}
                <div className="restaurant-reservation-info-container">
                    <img src={restaurant.restaurantPic} alt="restaurant" />
                    <div className="reservation-calendar-party-container">
                        <h2 style={{ textAlign: "left" }}>{restaurant.name}</h2>
                        <div className="reservation-calendar-party">

                            <div className="reservation-current-date-time"><i className="far fa-calendar" />{type === 'update' ? `${startDate.toString().slice(0, 10)} at ${restime}`
                                :
                                restime ? `${startDate.toString().slice(0, 10)} at ${restime}` : `Choose your reservation time below`}</div>
                            <div></div>
                            <div className="party-reservation-container"><i className="far fa-user" />{party}</div>
                        </div>
                    </div>
                </div>
                <div className="user-selection-reservation-container">
                    {type === 'update' ? <div>Modify your reservation</div> : <div>Make reservation</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="calendar-selection-form-container">
                            <i className="far fa-calendar" />
                            <DatePicker selected={startDate} minDate={now} onChange={(date) => setStartDate(date)} />
                        </div>
                        <div className="selection-reservation-container">
                            <i className="far fa-clock" />
                            {type !== 'update' ? filterBusinessHour.length ? <select value={restime} onChange={e => {
                                setresTime(e.target.value)
                            }}>{filterBusinessHour.map(time => <option key={time} value={time}>{time}</option>)}</select> : "Not Available"
                                :
                                <div>
                                    <div className="select-another-time-container">
                                        <label>Select another time<input value={checker} onChange={() => setChecker(prev => !prev)} type="checkbox" /></label>
                                    </div>
                                    {checker ? filterBusinessHour.length ? <select value={restime} onChange={e => {
                                        setresTime(e.target.value)
                                    }}>{filterBusinessHour.map(time => <option key={time} value={time}>{time}</option>)}</select> : "Not Available" : null}
                                </div>}
                            <p>{Object.values(error).length > 0 && error}</p>
                        </div>
                        <div className="party-container">
                            <i className="far fa-user" />
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
                        <div className="reservation-button-form-container">
                            <button type="submit"> {type === 'update' ? 'Update Reservation' : 'Find a new table'}</button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
            <div className="reservation-map-container">
                {apiKey && <Maps lat={restaurant.lat} lng={restaurant.lng} type={'reservation'} restaurant={restaurant} setSteps={setSteps} />}
                {steps.length ? steps.map((direction, i) => {
                    if (direction.maneuver.includes('right')) {
                        return (
                            <div key={i} id="whole-direction-container">
                                <div id="direction-icon-time-distance-container">
                                    <div>{direction.distance.text}</div>
                                    <i className="fas fa-directions"></i>
                                    <div>{direction.duration.text}</div>
                                </div>
                                <div id="direction-text-container">{parseDirection(direction.instructions)}</div>
                                
                            </div>
                        );
                    } else if (direction.maneuver.includes('left')) {
                        return (
                            <div key={i} id="whole-direction-container">
                                <div id="direction-icon-time-distance-container" >
                                    <div>{direction.distance.text}</div>
                                    <i className="fas fa-directions fa-flip-horizontal"></i>
                                    <div>{direction.duration.text}</div>
                                </div>

                                <div id="direction-text-container" >{parseDirection(direction.instructions)}</div>
                            </div>
                        );
                    } else {
                        return (
                            <div key={i} id="whole-direction-container">
                                <div id="direction-icon-time-distance-container">
                                    <div>{direction.distance.text}</div>
                                    <i className="fas fa-arrow-alt-circle-up"></i>
                                    <div>{direction.duration.text}</div>
                                </div>
                                <div id="direction-text-container" >{parseDirection(direction.instructions)}</div>
                            </div>
                        );
                    }
                }):null}
            </div>
        </div>
    )
}