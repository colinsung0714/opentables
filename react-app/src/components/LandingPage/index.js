import React, { useState, useEffect } from "react";
import { fetchAllRestaurants } from "../../store/restaurant";
import { useDispatch, useSelector } from "react-redux";
import '../LandingPage/LandingPage.css'
import { RestaurantContainer } from '../RestaurantContainer'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { dateformatConverter, selectionMapper } from "../helper";
import { fetchSearchRestaurant } from '../../store/restaurant'
import { fetchAllReservation } from "../../store/reservation";


export const LandingPage = () => {
    const dispatch = useDispatch()
    const today = new Date()
    const [time, setTime] = useState(today.getMinutes() < 30 ? new Date(today.getFullYear(), today.getMonth(), today.getDay(), today.getHours(), 30).toString().split(' ')[4].slice(0, 5) : new Date(today.getFullYear(), today.getMonth(), today.getDay(), today.getHours() + 1, 0).toString().split(' ')[4].slice(0, 5))
    const [startDate, setstartDate] = useState(today)
    const [party, setParty] = useState(2)
    const [search, setSearch] = useState('')
    const [error, setError] = useState({})
    const restaurants = Object.values(useSelector(state => state.restaurant.allRestaurants))
    const todayParts = today.toString().split(' ')
    const firstTime = today.getMinutes() < 30 ? new Date(today.getFullYear(), today.getMonth(), today.getDay(), today.getHours(), 30) : new Date(today.getFullYear(), today.getMonth(), today.getDay(), today.getHours() + 1, 0)
    const secondTime = new Date(firstTime.getTime() + 30 * 60 * 1000)
    const thirdTime = new Date(secondTime.getTime() + 30 * 60 * 1000)
    const fourthTime = new Date(thirdTime.getTime() + 30 * 60 * 1000)
    const fifthTime = new Date(fourthTime.getTime() + 30 * 60 * 1000)
    const sixthTime = new Date(fifthTime.getTime() + 30 * 60 * 1000)
    const seventhTime = new Date(sixthTime.getTime() + 30 * 60 * 1000)
    const eighthTime = new Date(seventhTime.getTime() + 30 * 60 * 1000)
    const ninthTime = new Date(eighthTime.getTime() + 30 * 60 * 1000)
    const tenthTime = new Date(ninthTime.getTime() + 30 * 60 * 1000)
    const reservations = Object.values(useSelector(state=>state.reservation.allReservations))
    useEffect(() => {
        dispatch(fetchAllRestaurants()).then(()=>dispatch(fetchAllReservation()))
    }, [])
    const handleTime = e => {
        setTime(e.target.value)
    }
    const handleParty = e => {
        setParty(e.target.value)
    }
    const handleSubmit = e => {
        e.preventDefault();
        const searchData = {
            party,
            name: search,
            date_time: dateformatConverter(startDate, time)
        }
        dispatch(fetchSearchRestaurant(searchData)).catch(e => setError(e))
        setError({})
    }

    return (
        <>
            <div className="search-filter-contaner">
                <div style={{ fontSize: '48px', color: 'white', fontWeight: 'bold' }}>Find your table for any occasion</div>
                <form onSubmit={handleSubmit} className="date-time-party-container">
                    <div className="date-container">
                        <DatePicker selected={startDate} minDate={today} onChange={(date) => setstartDate(date)} />
                    </div>
                    <div className="time-container">
                        <i className="far fa-clock"></i>
                        <select value={time} onChange={handleTime}>
                            {startDate.toString().slice(0, 15) === today.toString().slice(0, 15) ? <>
                                <option value={firstTime.toString().split(' ')[4].slice(0, 5)}>{firstTime.toString().split(' ')[4].slice(0, 5)}</option>
                                <option value={secondTime.toString().split(' ')[4].slice(0, 5)}>{secondTime.toString().split(' ')[4].slice(0, 5)}</option>
                                <option value={thirdTime.toString().split(' ')[4].slice(0, 5)}>{thirdTime.toString().split(' ')[4].slice(0, 5)}</option>
                                <option value={fourthTime.toString().split(' ')[4].slice(0, 5)}>{fourthTime.toString().split(' ')[4].slice(0, 5)}</option>
                                <option value={fifthTime.toString().split(' ')[4].slice(0, 5)}>{fifthTime.toString().split(' ')[4].slice(0, 5)}</option>
                                <option value={sixthTime.toString().split(' ')[4].slice(0, 5)}>{sixthTime.toString().split(' ')[4].slice(0, 5)}</option>
                                <option value={seventhTime.toString().split(' ')[4].slice(0, 5)}>{seventhTime.toString().split(' ')[4].slice(0, 5)}</option>
                                <option value={eighthTime.toString().split(' ')[4].slice(0, 5)}>{eighthTime.toString().split(' ')[4].slice(0, 5)}</option>
                                <option value={ninthTime.toString().split(' ')[4].slice(0, 5)}>{ninthTime.toString().split(' ')[4].slice(0, 5)}</option>
                                <option value={tenthTime.toString().split(' ')[4].slice(0, 5)}>{tenthTime.toString().split(' ')[4].slice(0, 5)}</option>
                            </>
                                : selectionMapper().map(el => <option key={el} value={el}>{el}</option>)
                            }
                        </select>
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
                    <div className="search-bar">
                        <i className="fas fa-search"></i>
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Restaurant..." />
                    </div>
                    <button type="submit">Let's go</button>
                </form>
            </div>
            <h2 id="restaurants-header">All Restaurants</h2>
            <div className="restaurants-container">
                {error.error && <p>{error.error}</p>}
                {restaurants.length ? restaurants.map(restaurant => <div key={restaurant.id} className="restaurant-single-landing-container"><RestaurantContainer restaurant={restaurant} reservations={reservations} startDate={startDate}/></div>) : <div style={{ margin: "0 140px", width: "400px" }}>There is no available restaurants</div>}
            </div>
                            
        </>
    )
}

