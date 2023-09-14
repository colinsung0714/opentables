import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import '../ReservationContainer/ReservationContainer.css'
import { convertTimetoString } from '../helper'
import OpenModalButton from "../OpenModalButton";
import { DeleteModalButton } from "../DeleteModalButton"
import { useModal } from '../../context/Modal';
import { NewReviewFormModal } from "../NewReviewFormModal";

export const ReservationContainer = ({ reservation, type }) => {
    const dispatch = useDispatch()
    const { setModalContent, setOnModalClose } = useModal();
    const currentUser = useSelector(state => state.session.user)
    const reservationDateTimeParts = convertTimetoString(reservation.reservationDate).split(' ')
    const timeParts = reservationDateTimeParts[4].slice(0, 5)
    const history = useHistory()
    const handleReview = () => {
        history.push(`/restaurants/${reservation.restaurantInfo.id}`)
        setModalContent(<NewReviewFormModal reservation={reservation} user={currentUser} type={'create'}/>)
    }
    const handleReviewUpdate = () => {
        history.push(`/restaurants/${reservation.restaurantInfo.id}`)
        setModalContent(<NewReviewFormModal reservation={reservation} user={currentUser} type={'update'}/>)
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
                    <OpenModalButton
                        className='reservation-delete-button'
                        buttonText="Cancel"
                        modalComponent={<DeleteModalButton reservation={reservation} type={'reservation'} />}
                    />
                </div>
                :
                <div className="reservation-button-past-container">
                    { reservation.restaurantInfo.reviews.find(review=>review.userId === currentUser.id) ? <button  onClick={() => handleReviewUpdate()}>Update your Review</button> : <button  onClick={() => handleReview()}>Leave a Review</button>}
                    <OpenModalButton
                        className='reservation-delete-button'
                        buttonText="Delete Reservation"
                        modalComponent={<DeleteModalButton reservation={reservation} type={'reservation'} />}
                    />
                </div>
            }
            </div>
        </div>
    )
}