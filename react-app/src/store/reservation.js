const ALL_USER_RESERVATION = '/:userId/reservations'
const ALL_RESTAURANT_RESERVATION = '/:restaurantId/reservations'
const NEW_RESERVATION = '/user/:userId/restaurants/:restaurantId/new'
const DELETE_RESERVATION = '/:reservationId/delete'
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
        console.log(data)
        dispatch(deleteReservation(data))
    } else {
        const error = await res.json()
        throw error
    }
}
const initialState = { reservations:{}, restaurantReservations:{}}

export default function reservationsReducer(state=initialState, action) {
    switch (action.type) {
        case ALL_USER_RESERVATION: {
            const newState = {...state, reservations:{...state.reservations}, restaurantReservations:{...state.restaurantReservations}}
            action.reservations.reservations.forEach(reservation => {
                newState.reservations[reservation.id] = reservation                
            });
            return newState
        }
        case ALL_RESTAURANT_RESERVATION: {
            const newState = {...state, reservations:{...state.reservations}, restaurantReservations:{...state.restaurantReservations}}
            action.reservations.reservations.forEach(reservation => {
                newState.restaurantReservations[reservation.id] = reservation                
            });
            return newState
        }
        case NEW_RESERVATION: {
            const newState = {...state, reservations:{...state.reservations}, restaurantReservations:{...state.restaurantReservations}}
            return {...newState, reservations:{...newState.reservations, [action.reservation.id]:{...action.reservation}}, restaurantReservations:{...newState.restaurantReservations}}
        }
        case DELETE_RESERVATION: {
            const newState = {...state, reservations:{...state.reservations}, restaurantReservations:{...state.restaurantReservations}}
            delete newState.reservations[action.reservation.id]
            delete newState.restaurantReservations[action.reservation.id]
            return {...newState, reservations:{...newState.reservations}, restaurantReservations:{...newState.restaurantReservations}}
        }
        default:
            return state
    }
}