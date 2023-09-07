import React, { useState, useEffect } from "react";
import { fetchAllRestaurants } from "../../store/restaurant";
import { useDispatch, useSelector } from "react-redux";
import '../LandingPage/LandingPage.css'
import { RestaurantContainer } from '../RestaurantContainer'
export const LandingPage = () => {
    const dispatch = useDispatch()
    const today = new Date()
    const [time, setTime] = useState(today)
    const [party, setParty] = useState(2)
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
    useEffect(() => {
        dispatch(fetchAllRestaurants())
    }, [])
    const handleTime = e => {
        setTime(e.target.value)
    }
    const handleParty = e => {
        setParty(e.target.value)
    }
    if (!restaurants.length) return null
    return (
        <>
            <div className="search-filter-contaner">
                <div style={{ fontSize: '48px', color: 'white', fontWeight: 'bold' }}>Find your table for any occasion</div>
                <form className="date-time-party-container">
                    <div className="date-container">
                        <i className="far fa-calendar"></i>
                        <div>{todayParts[1]}</div>
                        <div>{todayParts[2]},</div>
                        <div>{todayParts[3]}</div>
                        <i className="fas fa-angle-down"></i>
                    </div>
                    <div className="time-container">
                        <i className="far fa-clock"></i>
                        <select value={time} onChange={handleTime}>
                            <option value={firstTime}>{firstTime.toString().split(' ')[4].slice(0, 5)}</option>
                            <option value={secondTime}>{secondTime.toString().split(' ')[4].slice(0, 5)}</option>
                            <option value={thirdTime}>{thirdTime.toString().split(' ')[4].slice(0, 5)}</option>
                            <option value={fourthTime}>{fourthTime.toString().split(' ')[4].slice(0, 5)}</option>
                            <option value={fifthTime}>{fifthTime.toString().split(' ')[4].slice(0, 5)}</option>
                            <option value={sixthTime}>{sixthTime.toString().split(' ')[4].slice(0, 5)}</option>
                            <option value={seventhTime}>{seventhTime.toString().split(' ')[4].slice(0, 5)}</option>
                            <option value={eighthTime}>{eighthTime.toString().split(' ')[4].slice(0, 5)}</option>
                            <option value={ninthTime}>{ninthTime.toString().split(' ')[4].slice(0, 5)}</option>
                            <option value={tenthTime}>{tenthTime.toString().split(' ')[4].slice(0, 5)}</option>
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
                        <input placeholder="Location, Restaurant, or Cuisine" />
                    </div>
                </form>
            </div>
            <h2 id="restaurants-header">Available for dinner now</h2>
            <div className="restaurants-container">
                
                {restaurants.map(restaurant => <div key={restaurant.id}><RestaurantContainer restaurant={restaurant}/></div>)}
            </div>
        </>
    )
}