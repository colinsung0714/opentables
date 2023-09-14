const ALL_USER_RESERVATION = '/:userId/reservations'
const ALL_RESTAURANT_RESERVATION = '/:restaurantId/reservations'
const NEW_RESERVATION = '/user/:userId/restaurants/:restaurantId/new'
const DELETE_RESERVATION = '/:reservationId/delete'
const ALL_RESERVATION ='/reservations/all'
const allUserReservations = (reservations) => {
    return {
        type:ALL_USER_RESERVATION,
        reservations
    }
}

const allRestaurantReservations = (reservations) => {
    return {
        type:ALL_RESTAURANT_RESERVATION,
        reservations
    }
}

const newReservation = reservation => {
    return {
        type:NEW_RESERVATION,
        reservation
    }
}

const deleteReservation = reservation => {
    return {
        type:DELETE_RESERVATION,
        reservation
    }
}

const allReservation = reservations => {
    return {
        type:ALL_RESERVATION,
        reservations
    }
}

export const fetchallUserReservations = userId => async dispatch => {
    const res = await fetch(`/api/reservations/users/${userId}/all`)
    if(res.ok) {
        const data = await res.json()
        dispatch(allUserReservations(data))
    } else {
        const error = await res.json()
        throw error
    }
}

export const fetchallRestaurantReservations = restaurantId => async dispatch => {
    const res = await fetch(`/api/reservations/restaurants/${restaurantId}/all`)
    if(res.ok) {
        const data = await res.json()
        dispatch(allRestaurantReservations(data))
    } else {
        const error = await res.json()
        throw error
    }
}

export const fetchNewReservation = (restaurantId, userId, data) => async dispatch => {
    const res = await fetch(`/api/reservations/user/${userId}/restaurants/${restaurantId}/new`, {
        method:'POST',
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify(data)
    })

    if(res.ok) {
        const recivedData = await res.json()
        dispatch(newReservation(recivedData))
    }
    else {
        const error = await res.json()
        throw error
    }
}

export const fetchUpdateReservation = (reservationId, reservation) => async dispatch => {
    const res = await fetch(`/api/reservations/${reservationId}/edit`, {
        method:'PUT',
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify(reservation)
    })
    if(res.ok) {
        const recivedData = await res.json()
        dispatch(newReservation(recivedData))
    }
    else {
        const error = await res.json()
        throw error
    }
}

export const fetchDeleteReservation = reservationId => async dispatch => {
    const res = await fetch(`/api/reservations/${reservationId}/delete`,{
        method:'DELETE'
    })
    if(res.ok) {
        const data = await res.json()
        dispatch(deleteReservation(data))
    } else {
        const error = await res.json()
        throw error
    }
}

export const fetchAllReservation = () => async dispatch => {
    const res = await fetch('/api/reservations/all')
    if(res.ok) {
        const data = await res.json()
        dispatch(allReservation(data))
    } else {
        const error = await res.json()
        throw error
    }
}
const initialState = { reservations:{}, restaurantReservations:{}, allReservations:{}}

export default function reservationsReducer(state=initialState, action) {
    switch (action.type) {
        case ALL_USER_RESERVATION: {
            const newState = {...state, reservations:{...state.reservations}, restaurantReservations:{...state.restaurantReservations}, allReservations:{...state.allReservations}}
            action.reservations.reservations.forEach(reservation => {
                newState.reservations[reservation.id] = reservation                
            });
            return newState
        }
        case ALL_RESTAURANT_RESERVATION: {
         
            const newState = {...state, reservations:{...state.reservations}, restaurantReservations:{...state.restaurantReservations}, allReservations:{...state.allReservations}}
            action.reservations.reservations.forEach(reservation => {
                newState.restaurantReservations[reservation.id] = reservation                
            });
            return newState
        }
        case NEW_RESERVATION: {
            const newState = {...state, reservations:{...state.reservations}, restaurantReservations:{...state.restaurantReservations}, allReservations:{...state.allReservations}}
            return {...newState, reservations:{...newState.reservations, [action.reservation.id]:{...action.reservation}}, restaurantReservations:{...newState.restaurantReservations}, allReservations:{...newState.allReservations, [action.reservation.id]:{...action.reservation}}}
        }
        case ALL_RESERVATION: {
            const newState = {...state, reservations:{...state.reservations}, restaurantReservations:{...state.restaurantReservations}, allReservations:{...state.allReservations}}
            action.reservations.reservations.forEach(reservation => {
                newState.allReservations[reservation.id] = reservation                
            });
            return newState
        }

        case DELETE_RESERVATION: {
            const newState = {...state, reservations:{...state.reservations}, restaurantReservations:{...state.restaurantReservations}, allReservations:{...state.allReservations}}
            delete newState.reservations[action.reservation.id]
            delete newState.restaurantReservations[action.reservation.id]
            delete newState.allReservations[action.reservation.id]
            return {...newState, reservations:{...newState.reservations}, restaurantReservations:{...newState.restaurantReservations}, allReservations:{...newState.allReservations}}
        }
        default:
            return state
    }
}