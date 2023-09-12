import React from "react";
import '../DeleteModalButton/DeleteModalButton.css'
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { fetchDelteRestaurant } from "../../store/restaurant";
import { convertTimetoString } from "../helper";
import { fetchDeleteReservation } from "../../store/reservation";
export const DeleteModalButton = ({ restaurant, type, reservation }) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const reservationDateTimeParts = convertTimetoString(reservation?.reservationDate).split(' ')
    const handleDelete = (restaurantId) => {
        dispatch(fetchDelteRestaurant(restaurantId)).then(()=>closeModal())
    }
    const handleDeleteReservation = (reservationId) => {
        dispatch(fetchDeleteReservation(reservationId)).then(()=>closeModal())
    }

    return (
        <div className="delte-modal-container">
            <div className="delete-upper-container"><img src='https://opentables.s3.us-west-1.amazonaws.com/onetableicon.png' /><h2>Open Tables</h2></div>
            <div className="delete-lower-container">
                {type ==='restaurant' ? `Are you sure to delete ${restaurant.name}?`
                : 
                <div>
                <div style={{fontWeight:"bold"}}>{reservation.restaurantInfo.name}</div> 
                <div style={{fontWeight:"bold"}}>{`${reservationDateTimeParts[0]}, ${reservationDateTimeParts[1]} ${reservationDateTimeParts[2]} at ${reservationDateTimeParts[4].slice(0,5)}`}</div>
                <div>Are you sure to delete this reservation?</div>
                </div>
                }
                <button onClick={()=>{
                    if (type==='restaurant') handleDelete(restaurant.id)
                    else handleDeleteReservation(reservation.id)
                }}>Yes</button>
                <button onClick={()=>closeModal()}>No</button>
            </div>
        </div>
    )
}