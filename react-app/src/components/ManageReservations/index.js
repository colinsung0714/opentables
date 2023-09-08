import React, { useEffect } from "react";
import { UserNavigation } from "../UserNavigation"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useHistory } from 'react-router-dom';
import '../ManageReservations/ManageReservations.css'
import { fetchallUserReservations } from "../../store/reservation";
import { upcomingReservations, pastReservations } from "../helper";
import { ReservationContainer } from "../ReservationContainer";
export const ManageReservations = () => {
    const { userId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const currentUser = useSelector(state => state.session.user)
    const reservations = Object.values(useSelector(state => state.reservation.reservations))
    useEffect(() => {
        dispatch(fetchallUserReservations(currentUser.id))
    }, [])
    if (Number(userId) !== currentUser.id) history.push('/')

    return (
        <div>
            <UserNavigation currentUser={currentUser} type={'reservations'} />
            <div className="user-reservations-container">
                {!reservations.length ? 'There is no reservations'
                    :
                    <div className="user-reservations">
                        <h2>Upcoming reservations</h2>
                        <div>
                            {upcomingReservations(reservations).length ? upcomingReservations(reservations).map(reservation =>
                                <div key={reservation.id}>
                                    <ReservationContainer reservation={reservation} type={'upcoming'}/>
                                </div>) : 'There is no reservations'}
                        </div>
                        <h2>Past reservations</h2>
                        <div>
                            {pastReservations(reservations).length ? pastReservations(reservations).map(reservation =>
                                <div key={reservation.id}>
                                    <ReservationContainer reservation={reservation} type={'past'}/>
                                </div>) : 'There is no reservations'}
                        </div>
                    </div>}
            </div>
        </div>
    )
}