import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import '../ReservationContainer/ReservationContainer.css'
import { convertTimetoString } from '../helper'
import { fetchDeleteReservation } from "../../store/reservation"
export const ReservationContainer = ({ reservation, type }) => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)
    const reservationDateTimeParts = convertTimetoString(reservation.reservationDate).split(' ')
    const timeParts = reservationDateTimeParts[4].slice(0, 5)
    const history = useHistory()
    const handleDelete = () => {
        dispatch(fetchDeleteReservation(reservation.id))
    }
    return (
        <div className="single-reservation-container">
            <div className="single-reservation-info">
                <img src={reservation.restaurantInfo.restaurantPic} />
                <div>
                    <h3>{reservation.restaurantInfo.name}</h3>
                    {type === 'upcoming' ? <div className="reservation-confirmed-container"><i className="fas fa-check-circle" style={{ color: '#47b329' }} /><div style={{ fontWeight: "bold" }}>Reservation confirmed</div></div> : <div className="reservation-completed-container"><i class="fas fa-hourglass-end" /><div style={{ fontWeight: "bold" }}>Reservation completed</div></div>}
                    <div className="party-date-container">
                        <div className="party-container"><i className="fas fa-users" /><div>{reservation.numGuests}</div></div>
                        <div className="date-time-container"><i className="far fa-calendar" /><div>{`${reservationDateTimeParts[0]}, ${reservationDateTimeParts[1]} ${reservationDateTimeParts[2]} at ${timeParts}`}</div></div>
                    </div>
                </div>
            </div>
            <div>{type === 'upcoming' ?
                <div className="reservation-button-upcoming-container">
                    <button onClick={() => history.push(`/user/${currentUser.id}/restaurants/${reservation.restaurantInfo.id}/reservations/new`, { type: 'update', reservation })}>Update</button>
                    <button onClick={handleDelete}>Cancle</button>
                </div>
                :
                <div className="reservation-button-past-container">
                    <button onClick={handleDelete}>Delete</button>
                </div>
            }
            </div>
        </div>
    )
}