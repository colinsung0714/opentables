const all_restaurants = 'restaurants/all'

const allRestaurants = (restaurants) => {
    return {
        type:all_restaurants,
        restaurants
    }
}

export const fetchAllRestaurants = () => async dispatch => {
    const res = await fetch('/api/restaurants/all')
    if(res.ok) {
        const data = await res.json()
        dispatch(allRestaurants(data))
    } else {
        const error = await res.json()
        throw error
    }
}

const initialState = { allRestaurants:{}, singleRestaurant:{}}

export default function restaurantsReducer(state=initialState, action) {
    switch (action.type) {
        case all_restaurants: {
            const newState = {...state, allRestaurants:{...state.allRestaurants}, singleRestaurant:{...state.singleRestaurant}}
            action.restaurants.restaurants.forEach(restaurant => {
                newState.allRestaurants[restaurant.id] = restaurant                
            });
            return newState
        }
        default:
            return state
    }
}
