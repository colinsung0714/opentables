import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import '../NewRestaurantForm/NewRestaurantForm.css'
import { selectionMapper, phoneValidate } from '../helper'
import { fetchNewRestaurant, fetchUpdateRestaurant } from "../../store/restaurant";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export const NewRestaurantForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const currentUser = useSelector(state => state.session.user)
    const type = location.state ? location.state.type : 'create'
    const restaurantId = location.state ? location.state.restaurantId : null
    const restaurant = Object.values(useSelector(state => state.restaurant.allRestaurants)).filter(updateRestaurant => updateRestaurant.id === restaurantId)
    const [mondayOpen, setMondayOpen] = useState(type === 'update' ? restaurant[0]?.business_hours.find(hours => hours.day === 'Monday')?.start : '')
    const [mondayClose, setMondayClose] = useState(type === 'update' ? restaurant[0]?.business_hours.find(hours => hours.day === 'Monday')?.end : '')
    const [checkMonday, setCheckMonday] = useState(type === 'update' && restaurant[0]?.business_hours.find(hours => hours.day === 'Monday')?.start ? true : false)
    const [tuesdayOpen, setTuesdayOpen] = useState(type === 'update' ? restaurant[0]?.business_hours.find(hours => hours.day === 'Tuesday')?.start : '')
    const [tuesdayClose, setTuesClose] = useState(type === 'update' ? restaurant[0]?.business_hours.find(hours => hours.day === 'Tuesday')?.end : '')
    const [checkTuesday, setCheckTuesday] = useState(type === 'update' && restaurant[0]?.business_hours.find(hours => hours.day === 'Tuesday')?.start ? true : false)
    const [wednesdayOpen, setWednesdayOpen] = useState(type === 'update' ? restaurant[0]?.business_hours.find(hours => hours.day === 'Wednesday')?.start : '')
    const [wednesClose, setWednesdayClose] = useState(type === 'update' ? restaurant[0]?.business_hours.find(hours => hours.day === 'Wednesday')?.end : '')
    const [checkWednesday, setCheckWednesday] = useState(type === 'update' && restaurant[0]?.business_hours.find(hours => hours.day === 'Wednesday')?.start ? true : false)
    const [thursdayOpen, setThursdayOpen] = useState(type === 'update' ? restaurant[0]?.business_hours.find(hours => hours.day === 'Thursday')?.start : '')
    const [thursdayClose, setThursdayClose] = useState(type === 'update' ? restaurant[0]?.business_hours.find(hours => hours.day === 'Thursday')?.end : '')
    const [checkThursday, setCheckThursday] = useState(type === 'update' && restaurant[0]?.business_hours.find(hours => hours.day === 'Thursday')?.start ? true : false)
    const [fridayOpen, setFridayOpen] = useState(type === 'update' ? restaurant[0]?.business_hours.find(hours => hours.day === 'Friday')?.start : '')
    const [fridayClose, setFridayClose] = useState(type === 'update' ? restaurant[0]?.business_hours.find(hours => hours.day === 'Friday')?.end : '')
    const [checkFriday, setCheckFriday] = useState(type === 'update' && restaurant[0]?.business_hours.find(hours => hours.day === 'Friday')?.start ? true : false)
    const [saturdayOpen, setSaturdayOpen] = useState(type === 'update' ? restaurant[0]?.business_hours.find(hours => hours.day === 'Saturday')?.start : '')
    const [saturdayClose, setSaturdayClose] = useState(type === 'update' ? restaurant[0]?.business_hours.find(hours => hours.day === 'Saturday')?.end : '')
    const [checkSaturday, setCheckSaturday] = useState(type === 'update' && restaurant[0]?.business_hours.find(hours => hours.day === 'Saturday')?.start ? true : false)
    const [sundayOpen, setSundayOpen] = useState(type === 'update' ? restaurant[0]?.business_hours.find(hours => hours.day === 'Sunday')?.start : '')
    const [sundayClose, setsundayClose] = useState(type === 'update' ? restaurant[0]?.business_hours.find(hours => hours.day === 'Sunday')?.end : '')
    const [checkSunday, setCheckSunday] = useState(type === 'update' && restaurant[0]?.business_hours.find(hours => hours.day === 'Sunday')?.start ? true : false)
    const [priceRange, setpriceRange] = useState(type === 'update' ? restaurant[0]?.avgPrice : 0)
    const [image, setImage] = useState(null);
    const [name, setName] = useState(type === 'update' ? restaurant[0]?.name : '')
    const [phone, setPhone] = useState(type === 'update' ? restaurant[0]?.phone : '')
    const [street, setStreet] = useState(type === 'update' ? restaurant[0]?.street : '')
    const [city, setCity] = useState(type === 'update' ? restaurant[0]?.city : '')
    const [state, setState] = useState(type === 'update' ? restaurant[0]?.state : '')
    const [country, setCountry] = useState(type === 'update' ? restaurant[0]?.country : 'United State')
    const [zipCode, setzipCode] = useState(type === 'update' ? restaurant[0]?.zipCode : '')
    const [categories, setCategories] = useState(type === 'update' ? restaurant[0]?.categories : '')
    const [description, setDescription] = useState(type === 'update' ? restaurant[0]?.description : '')
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(false)
    const [imageUrls, setImageUrls] = useState(type === 'update' ? restaurant[0]?.restaurantImages.map(el => el.url) : [])
    useEffect(() => {

        const errorObj = {}
        if (zipCode?.length !== 5 || isNaN(Number(zipCode))) {
            errorObj.zipcode = 'Need to be 5 digit numbers'

        }
        if (phoneValidate(phone)) {
            errorObj.phone = "Need to use only number and '-'"
        }
        if (name?.length < 1) errorObj.name = 'name should be less than 100 char'
        if (state?.length < 1) errorObj.state = '*'
        if (street?.length < 1) errorObj.street = '*'
        if (city?.length < 1) errorObj.city = '*'
        if (priceRange < 1) errorObj.priceRange = 'Select Price Rating:'
        if (categories?.length < 1 || categories?.length > 100) errorObj.categories = 'categories should be less than 100 char'
        if (description?.length < 1 || description?.length > 255) errorObj.description = 'description should be less than 255 char'
        if (checkMonday) {
            if (!mondayOpen || !mondayClose) errorObj.monday = 'Please select time for monday'
        }
        if (checkTuesday) {
            if (!tuesdayOpen || !tuesdayClose) errorObj.tuesday = 'Please select time for tuesday'
        }
        if (checkWednesday) {
            if (!wednesdayOpen || !wednesClose) errorObj.wednesday = 'Please select for wednesday'
        }
        if (checkThursday) {
            if (!thursdayOpen || !thursdayClose) errorObj.thursday = 'Please select time for thursday'
        }
        if (checkFriday) {
            if (!fridayOpen || !fridayClose) errorObj.fridday = 'Please select time for friday'
        }
        if (checkSaturday) {
            if (!saturdayOpen || !saturdayClose) errorObj.saturday = 'Please select time for saturday'
        }
        if (checkSunday) {
            if (!sundayOpen || !sundayClose) errorObj.sunday = 'Please select time for sunday'
        }
        setError(errorObj)
    }, [phone, zipCode, name, street, city, state, priceRange, categories, description, mondayOpen, mondayClose, checkMonday, tuesdayOpen, tuesdayClose, checkTuesday, wednesdayOpen, wednesClose, checkWednesday, thursdayOpen, thursdayClose, checkThursday, fridayOpen, fridayClose, checkFriday, saturdayOpen, saturdayClose, checkSaturday, sundayOpen, sundayClose, checkSunday])
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!Object.values(error).length) {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('phone', phone)
            formData.append('street', street)
            formData.append('city', city)
            formData.append('state', state)
            formData.append('country', country)
            formData.append('zip_code', zipCode)
            formData.append('categories', categories)
            formData.append('description', description)
            formData.append('avg_price', priceRange)
            if (image?.length) {
                for (let el of image) {
                    formData.append('restaurant_pic', el)
                }
            }
            if (checkMonday) {
                formData.append('monday_open', mondayOpen)
                formData.append('monday_close', mondayClose)
            }
            if (checkTuesday) {
                formData.append('tuesday_open', tuesdayOpen)
                formData.append('tuesday_close', tuesdayClose)
            }
            if (checkWednesday) {
                formData.append('wednesday_open', wednesdayOpen)
                formData.append('wednesday_close', wednesClose)
            }
            if (checkThursday) {
                formData.append('thursday_open', thursdayOpen)
                formData.append('thursday_close', thursdayClose)
            }
            if (checkFriday) {
                formData.append('friday_open', fridayOpen)
                formData.append('friday_close', fridayClose)
            }
            if (checkSaturday) {
                formData.append('saturday_open', saturdayOpen)
                formData.append('saturday_close', saturdayClose)
            }
            if (checkSunday) {
                formData.append('sunday_open', sundayOpen)
                formData.append('sunday_close', sundayClose)
            }

            if (type === 'update') dispatch(fetchUpdateRestaurant(formData, restaurantId)).then(restaurant => history.push(`/restaurants/${restaurantId}`)).catch(err => {
                const errorMsg = {}
                errorMsg.location = err.error
                setError(errorMsg)
                setLoading(false)
            })
            else dispatch(fetchNewRestaurant(formData, currentUser.id)).then(restaurant => history.push(`/restaurants/${restaurant.id}`)).catch(err => {
                const errorMsg = {}
                errorMsg.location = err.error
                setError(errorMsg)
                setLoading(false)
            })
            setLoading(true)
            setError({})
        }
    }
    const handleImages = e => {
        const files = [...e.target.files];
        setImage(files);

        const tempImageUrls = [];

        files.forEach((file) => {
            const url = URL.createObjectURL(file);
            tempImageUrls.push(url);
        });
        setImageUrls(tempImageUrls);
    }

    const responsive = {

        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        }
    };



    return (

        <div className="new-restaurant-container">

            <div className="intro-new-restaurant">
                <h2>Dig into the world's most complete restaurant platform</h2>
                <div>The most valuable diner network that's 20+ years in the making</div>
            </div>
            <div className="new-restaurant-form-container">
                <h2 style={{ textAlign: 'center' }}>{type === 'update' ? "Update your restaurant's information" : "Tell us about your restaurant business"}</h2>
                <div className="new-restaurant-form">
                    <form id="restaurant-form" encType="multipart/form-data" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <label>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <div>Restaurant Name</div>
                                {error.name && <p style={{ margin: "0", color: "red" }} >{error.name}</p>}
                            </div>
                            <input maxLength={100} placeholder="ex. my restaurant" style={{ width: "100%", height: "30px" }} type="text" value={name} onChange={e => setName(e.target.value)} required />
                        </label>
                        <div style={{ width: '100%', display: "flex" }}>
                            <label>
                                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                    <div>Phone</div>
                                    {error.phone && <p style={{ margin: "0", color: "red" }} >{error.phone}</p>}
                                </div>
                                <input placeholder="ex. xxx-xxx-xxxx" style={{ width: "100%", height: "30px" }} type="text" value={phone} onChange={e => setPhone(e.target.value)} required />
                            </label>

                            <label>
                                <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                    <div>Street</div>
                                    {error.street && <p style={{ margin: "0", color: "red" }} >{error.street}</p>}
                                </div>
                                <input placeholder="ex. 410 Terry Ave N" style={{ width: "100%", height: "30px" }} type="text" value={street} onChange={e => setStreet(e.target.value)} required />
                            </label>
                        </div>
                        <div style={{ width: '100%', display: "flex" }}>
                            <label>
                                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                    <div>City</div>
                                    {error.city && <p style={{ margin: "0", color: "red" }} >{error.city}</p>}
                                </div>
                                <input placeholder="ex. Seattle" style={{ width: "100%", height: "30px" }} type="text" value={city} onChange={e => setCity(e.target.value)} required />
                            </label>
                            <label>
                                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                    <div>State</div>
                                    {error.state && <p style={{ margin: "0", color: "red" }} >{error.state}</p>}
                                </div>
                                <input placeholder="ex. WA" style={{ width: "100%", height: "30px" }} type="text" value={state} onChange={e => setState(e.target.value)} required />
                            </label>
                            <label>
                                <div>Country</div>
                                <input style={{ width: "100%", height: "30px" }} type="text" value={country} required />
                            </label>
                            <label>
                                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                    <div>Zip Code</div>
                                    {error.zipcode && <p style={{ margin: "0", color: "red" }}>{error.zipcode}</p>}
                                </div>
                                <input placeholder="ex. 98109" style={{ width: "100%", height: "30px" }} type="text" value={zipCode} onChange={e => setzipCode(e.target.value)} required />
                            </label>

                        </div>
                        <div style={{ width: '100%', display: "flex" }}>
                            <label>
                                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                    <div>Categories</div>
                                    {error.categories && <p style={{ margin: "0", color: "red" }} >{error.categories}</p>}
                                </div>
                                <input placeholder="ex. Korean" style={{ width: "100%", height: "30px" }} type="text" value={categories} onChange={e => setCategories(e.target.value)} required />
                            </label>
                        </div>
                        <div style={{ width: '100%', display: "flex" }}>
                            <label style={{ width: "100%" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                    <div>Description</div>
                                    {error.description && <p style={{ margin: "0", color: "red" }} >{error.description}</p>}
                                </div>
                                <textarea placeholder="ex. Nice Restaurant..." style={{ width: "100%", height: "200px" }} type="text" value={description} onChange={e => setDescription(e.target.value)} required />
                            </label>
                        </div>
                        <div>
                            <div className="rating-input" style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
                                <div>
                                    {error.priceRange ? <p style={{ margin: "0", color: "red" }} >{error.priceRange}</p> : "Price Rating:"}
                                </div>
                                <div>
                                    <i className="fas fa-dollar-sign" style={priceRange > 0 ? null : { color: '#d1d5d6' }} onMouseEnter={() => { setpriceRange(1) }} onMouseLeave={() => setpriceRange(priceRange)} onClick={() => setpriceRange(priceRange)}></i>
                                </div>
                                <div >
                                    <i className="fas fa-dollar-sign" style={priceRange > 1 ? null : { color: '#d1d5d6' }} onMouseEnter={() => { setpriceRange(2) }} onMouseLeave={() => setpriceRange(priceRange)} onClick={() => setpriceRange(priceRange)}> </i>
                                </div>
                                <div >
                                    <i className="fas fa-dollar-sign" style={priceRange > 2 ? null : { color: '#d1d5d6' }} onMouseEnter={() => { setpriceRange(3) }} onMouseLeave={() => setpriceRange(priceRange)} onClick={() => setpriceRange(priceRange)}></i>
                                </div>
                                <div >
                                    <i className="fas fa-dollar-sign" style={priceRange > 3 ? null : { color: '#d1d5d6' }} onMouseEnter={() => { setpriceRange(4) }} onMouseLeave={() => setpriceRange(priceRange)} onClick={() => setpriceRange(priceRange)}></i>
                                </div>
                            </div>
                            <div style={{ width: '100%' }}>
                                <label style={{ width: '100%', display: "flex", flexDirection: "column", gap: "10px" }}>
                                    <div>Restaurant Picture</div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImages}
                                    />
                                </label>
                                <div style={{ width: "600px", paddingTop: "10px" }}>
                                    {imageUrls?.length > 0 && <Carousel responsive={responsive}>
                                        {imageUrls.map(el => <img style={{ width: "150px", height: "150px", borderRadius: "10px" }} src={el} key={el} />)}
                                    </Carousel>}
                                </div>
                            </div>
                        </div>
                        <div className="businesshour-container-newform">
                            <div>Business Hours</div>
                            {error.monday && <p style={{ margin: "0", color: "red" }} >{error.monday}</p>}
                            {error.tuesday && <p style={{ margin: "0", color: "red" }} >{error.tuesday}</p>}
                            {error.wednesday && <p style={{ margin: "0", color: "red" }} >{error.wednesday}</p>}
                            {error.thursday && <p style={{ margin: "0", color: "red" }} >{error.thursday}</p>}
                            {error.friday && <p style={{ margin: "0", color: "red" }} >{error.friday}</p>}
                            {error.saturday && <p style={{ margin: "0", color: "red" }} >{error.saturday}</p>}
                            {error.sunday && <p style={{ margin: "0", color: "red" }} >{error.sunday}</p>}
                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                <label>
                                    Monday
                                    <input type="checkbox" value={checkMonday} checked={checkMonday} onChange={() => setCheckMonday(prev => !prev)} />
                                </label>
                                <label>
                                    Open
                                    <select disabled={!checkMonday} value={mondayOpen} onChange={e => setMondayOpen(e.target.value)}>{selectionMapper().map(time => <option key={time} value={time}>{time}</option>)}</select>
                                </label>
                                <label>
                                    Close
                                    <select disabled={!mondayOpen || !checkMonday} value={mondayClose} onChange={e => setMondayClose(e.target.value)}>{selectionMapper().slice(selectionMapper().indexOf(mondayOpen) + 1).map(time => <option key={time} value={time}>{time}</option>)}</select>
                                </label>
                            </div>
                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                <label>
                                    Tuesday
                                    <input type="checkbox" value={checkTuesday} checked={checkTuesday} onChange={() => setCheckTuesday(prev => !prev)} />
                                </label>
                                <label>
                                    Open
                                    <select disabled={!checkTuesday} value={tuesdayOpen} onChange={e => setTuesdayOpen(e.target.value)}>{selectionMapper().map(time => <option key={time} value={time}>{time}</option>)}</select>
                                </label>
                                <label>
                                    Close
                                    <select disabled={!tuesdayOpen || !checkTuesday} value={tuesdayClose} onChange={e => setTuesClose(e.target.value)}>{selectionMapper().slice(selectionMapper().indexOf(tuesdayOpen) + 1).map(time => <option key={time} value={time}>{time}</option>)}</select>
                                </label>
                            </div>
                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                <label>
                                    Wednesday
                                    <input type="checkbox" checked={checkWednesday} value={checkWednesday} onChange={() => setCheckWednesday(prev => !prev)} />
                                </label>
                                <label>
                                    Open
                                    <select disabled={!checkWednesday} value={wednesdayOpen} onChange={e => setWednesdayOpen(e.target.value)}>{selectionMapper().map(time => <option key={time} value={time}>{time}</option>)}</select>
                                </label>
                                <label>
                                    Close
                                    <select disabled={!wednesdayOpen || !checkWednesday} value={wednesClose} onChange={e => setWednesdayClose(e.target.value)}>{selectionMapper().slice(selectionMapper().indexOf(wednesdayOpen) + 1).map(time => <option key={time} value={time}>{time}</option>)}</select>
                                </label>
                            </div>
                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                <label>
                                    Thursday
                                    <input type="checkbox" checked={checkThursday} value={checkThursday} onChange={() => setCheckThursday(prev => !prev)} />
                                </label>
                                <label>
                                    Open
                                    <select disabled={!checkThursday} value={thursdayOpen} onChange={e => setThursdayOpen(e.target.value)}>{selectionMapper().map(time => <option key={time} value={time}>{time}</option>)}</select>
                                </label>
                                <label>
                                    Close
                                    <select disabled={!thursdayOpen || !checkThursday} value={thursdayClose} onChange={e => setThursdayClose(e.target.value)}>{selectionMapper().slice(selectionMapper().indexOf(thursdayOpen) + 1).map(time => <option key={time} value={time}>{time}</option>)}</select>
                                </label>
                            </div>
                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                <label>
                                    Friday
                                    <input type="checkbox" checked={checkFriday} value={checkFriday} onChange={() => setCheckFriday(prev => !prev)} />
                                </label>
                                <label>
                                    Open
                                    <select disabled={!checkFriday} value={fridayOpen} onChange={e => setFridayOpen(e.target.value)}>{selectionMapper().map(time => <option key={time} value={time}>{time}</option>)}</select>
                                </label>
                                <label>
                                    Close
                                    <select disabled={!fridayOpen || !checkFriday} value={fridayClose} onChange={e => setFridayClose(e.target.value)}>{selectionMapper().slice(selectionMapper().indexOf(fridayOpen) + 1).map(time => <option key={time} value={time}>{time}</option>)}</select>
                                </label>
                            </div>
                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                <label>
                                    Saturday
                                    <input type="checkbox" checked={checkSaturday} value={checkSaturday} onChange={() => setCheckSaturday(prev => !prev)} />
                                </label>
                                <label>
                                    Open
                                    <select disabled={!checkSaturday} value={saturdayOpen} onChange={e => setSaturdayOpen(e.target.value)}>{selectionMapper().map(time => <option key={time} value={time}>{time}</option>)}</select>
                                </label>
                                <label>
                                    Close
                                    <select disabled={!saturdayOpen || !checkSaturday} value={saturdayClose} onChange={e => setSaturdayClose(e.target.value)}>{selectionMapper().slice(selectionMapper().indexOf(saturdayOpen) + 1).map(time => <option key={time} value={time}>{time}</option>)}</select>
                                </label>
                            </div>
                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                <label>
                                    Sunday
                                    <input type="checkbox" checked={checkSunday} value={checkSunday} onChange={() => setCheckSunday(prev => !prev)} />
                                </label>
                                <label>
                                    Open
                                    <select disabled={!checkSunday} value={sundayOpen} onChange={e => setSundayOpen(e.target.value)}>{selectionMapper().map(time => <option key={time} value={time}>{time}</option>)}</select>
                                </label>
                                <label>
                                    Close
                                    <select disabled={!sundayOpen || !checkSunday} value={sundayClose} onChange={e => setsundayClose(e.target.value)}>{selectionMapper().slice(selectionMapper().indexOf(sundayOpen) + 1).map(time => <option key={time} value={time}>{time}</option>)}</select>
                                </label>
                            </div>
                        </div>
                        {loading && <div style={{ display: "flex", gap: "20px", justifyContent: "center", alignItems: "center", padding:"20px" }}>
                            <i id="loading-circle" className="fas fa-circle-notch" style={{ color: '#2b46b6' }}></i>
                            <p style={{ fontWeight: "bold" }}>Please wait...</p>
                        </div>}
                        {error.location && <p style={{ color: "red", textAlign:"center" }}>{error.location}</p>}
                        <button style={Object.values(error).length > 0 ? { backgroundColor: "#ccc", color: "#666", cursor: "not-allowed" } : null} type="submit">{type === 'update' ? 'Update Restaurant' : 'Submit'}</button>
                        <div id="empty-space" style={{ height: "50px" }}></div>
                    </form>
                </div>

            </div>
        </div>

    )
}