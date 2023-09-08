const ALL_USER_RESERVATION = '/:userId/reservations'

const allUserReservations = (reservations) => {
    return {
        type:ALL_USER_RESERVATION,
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

const initialState = { reservations:{}}

export default function reservationsReducer(state=initialState, action) {
    switch (action.type) {
        case ALL_USER_RESERVATION: {
            const newState = {...state, reservations:{}}
            action.reservations.reservations.forEach(reservation => {
                newState.reservations[reservation.id] = reservation                
            });
            return newState
        }
        default:
            return state
    }
}