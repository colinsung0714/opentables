import React from "react";
import '../ReservationContainer/ReservationContainer.css'
import {convertTimetoString} from '../helper'
export const ReservationContainer = ({ reservation, type }) => {
    const reservationDateTimeParts = convertTimetoString(reservation.reservationDate).split(' ')
    const timeParts = reservationDateTimeParts[4].slice(0, 5)
    
    return (
        <div className="single-reservation-container">
            <div className="single-reservation-info">
                <img src={reservation.restaurantInfo.restaurantPic} />
                <div>
                    <h3>{reservation.restaurantInfo.name}</h3>
                    {type === 'upcoming' ? <div className="reservation-confirmed-container"><i className="fas fa-check-circle" style={{ color: '#47b329' }} /><div style={{fontWeight:"bold"}}>Reservation confirmed</div></div> : <div className="reservation-completed-container"><i class="fas fa-hourglass-end" /><div style={{fontWeight:"bold"}}>Reservation completed</div></div>}
                    <div className="party-date-container">
                        <div className="party-container"><i className="fas fa-users" /><div>{reservation.numGuests}</div></div>
                        <div className="date-time-container"><i className="far fa-calendar" /><div>{`${reservationDateTimeParts[0]}, ${reservationDateTimeParts[1]} ${reservationDateTimeParts[2]} at ${timeParts}`}</div></div>
                    </div>
                </div>
            </div>
            <div>{type === 'upcoming' ?
                <div className="reservation-button-upcoming-container">
                    <button>Update</button>
                    <button>Cancle</button>
                </div> 
                : 
                <div className="reservation-button-past-container">
                    <button>Delete</button>
                </div>
            }
            </div>
        </div>
    )
}