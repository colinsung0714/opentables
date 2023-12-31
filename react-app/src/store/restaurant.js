const all_restaurants = 'restaurants/all'
const single_restaurant = 'restaurants/:restaurantId'
const new_restaurant = 'restaurants/new'
const delete_restaurant = 'restaurants/delete'
const FILTER_RESTAURANTS = 'restaurants/search'
const allRestaurants = (restaurants) => {
    return {
        type:all_restaurants,
        restaurants
    }
}

const filterRestaurants = restaurants => {
    return {
        type:FILTER_RESTAURANTS,
        restaurants
    }
}

const singleRestaurant = restaurant => {
    return {
        type:single_restaurant,
        restaurant
    }
}

const newRestaurant = restaurant => {
    return {
        type:new_restaurant,
        restaurant
    }
}

const deleteRestaurant = restaurant => {
    return {
        type:delete_restaurant,
        restaurant
    }
}

export const fetchNewRestaurant = (restaurant, userId) => async dispatch => {
    const res = await fetch(`/api/restaurants/new/${userId}`, {
        method:'POST',
        body: restaurant
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(newRestaurant(data))
        return data
    } else {
        const error = await res.json()
        throw error
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

export const fetchSingleRestaurants = restaurantId => async dispatch => {

    const res = await fetch(`/api/restaurants/${restaurantId}`)
    if(res.ok) {
        const data = await res.json()

        dispatch(singleRestaurant(data))
    } else {
        const error = await res.json()
  
        
        throw error
    }
}

export const fetchUpdateRestaurant = (restaurant, restaurantId) => async dispatch => {
    const res = await fetch(`/api/restaurants/${restaurantId}/edit`, {
        method:'PUT',
        body:restaurant
    })
    if(res.ok) {
        const data = await res.json()
        dispatch(newRestaurant(data))
        return data
    } else {
        const error = await res.json()
        throw error
    }
}

export const fetchDelteRestaurant = restaurantId => async dispatch => {
    const res = await fetch(`/api/restaurants/${restaurantId}/delete`, {
        method:'DELETE'
    })
    if(res.ok) {
        const data = await res.json()
        dispatch(deleteRestaurant(data))
    } else {
        const error = await res.json()
        throw error
    }
}

export const fetchSearchRestaurant = restaurant => async dispatch => {
    const res = await fetch('/api/restaurants/search', {
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify(restaurant)
    })
    if(res.ok) {
        const recivedData = await res.json()
        dispatch(filterRestaurants(recivedData))
    }
    else {
        const error = await res.json()
        throw error
    }
}

export const fetchSearchRestaurantSuggestion = restaurant => async dispatch => {
    const res = await fetch('/api/restaurants/search', {
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify(restaurant)
    })
    if(res.ok) {
        const recivedData = await res.json()
        return recivedData
    }
    else {
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
        case single_restaurant: {
           
            const newState = {...state, allRestaurants:{...state.allRestaurants}, singleRestaurant:{...state.singleRestaurant}}
            return {...newState, allRestaurants:{...newState.allRestaurants, [action.restaurant.id]:{...action.restaurant}}, singleRestaurant:{...action.restaurant}}
        }
        case new_restaurant: {
            const newState = {...state, allRestaurants:{...state.allRestaurants, [action.restaurant.id]:{...action.restaurant}}, singleRestaurant:{...action.restaurant}}
            return newState
        }
        case delete_restaurant: {
            const newState =  {...state, allRestaurants:{...state.allRestaurants}, singleRestaurant:{...state.singleRestaurant}}
            delete newState.allRestaurants[action.restaurant.id]
            return {...newState, allRestaurants:{...newState.allRestaurants}, singleRestaurant:{...newState.singleRestaurant}}
        }
        case FILTER_RESTAURANTS: {
            const newState = {...state, allRestaurants:{}, singleRestaurant:{}}
            action.restaurants.restaurants?.forEach(restaurant => {
                newState.allRestaurants[restaurant.id] = restaurant                
            });
            return newState
        }
        default:
            return state
    }
}
