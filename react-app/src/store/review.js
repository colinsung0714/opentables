const ALL_REVIEW_RESTAURANT = 'reviews/restaurants/:restaurantId/'
const ADD_REVIEW = 'reviews/restaurants/:restaurantId/user/:userId'
const UPDATE_REVIEW = 'reviews/:reviewId/edit'
const DELETE_REVIEW = 'review/:reviewId/delete'
const allReviewRestaurant = (reviews) => {
    return {
        type: ALL_REVIEW_RESTAURANT,
        reviews
    }
}

const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    }
}

const deleteReview = (review) => {
    return {
        type:DELETE_REVIEW,
        review
    }
}

export const fetchReviewRestaurant = restaurantId => async dispatch => {
    const res = await fetch(`/api/reviews/restaurants/${restaurantId}`)
    if (res.ok) {
        const data = await res.json()
        dispatch(allReviewRestaurant(data))
    } else {
        const error = await res.json()
        console.log(error)
        throw error
    }
}

export const fetchaddReview = (review, restaurantId, userId) => async dispatch => {
    const res = await fetch(`/api/reviews/restaurants/${restaurantId}/user/${userId}`, {
        method: "POST",
        body: review
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(addReview(data))
    } else {
        const error = await res.json()
        throw error
    }
}

export const fetchupdateReview = (review, reviewId) => async dispatch => {
    const res = await fetch(`/api/reviews/${reviewId}/edit`, {
        method: "PUT",
        body: review
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(addReview(data))
    } else {
        const error = await res.json()
        throw error
    }
}

export const fetchDeleteReview = (reviewId, restaurantId) => async dispatch => {
    const res = await fetch(`/api/reviews/${reviewId}/restaurant/${restaurantId}/delete`, {
        method: "DELETE",
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(deleteReview(data))
    } else {
        const error = await res.json()
        throw error
    } 
}

const initialState = { restaurantReviews: {}, userReviews: {} }
export default function reviewsReducer(state = initialState, action) {
    switch (action.type) {
        case ALL_REVIEW_RESTAURANT: {
            
            const newState = { ...state, restaurantReviews: {}, userReviews: {} }
            action.reviews.reviews.forEach(review => {
                newState.restaurantReviews[review.id] = review
            });
            return newState
        }
        case ADD_REVIEW : {
            const newState = { ...state, restaurantReviews: { ...state.restaurantReviews }, userReviews: { ...state.userReviews } }
            return {...newState, restaurantReviews:{...newState.restaurantReviews, [action.review.id]:{...action.review}}, userReviews:{...newState.userReviews, [action.review.id]:{...action.review}}}
        }

        case DELETE_REVIEW : {
            const newState = { ...state, restaurantReviews: { ...state.restaurantReviews }, userReviews: { ...state.userReviews } }
            delete newState.restaurantReviews[action.review.id]
            delete newState.userReviews[action.review.id]
            return {...newState, restaurantReviews:{...newState.restaurantReviews}, userReviews:{...newState.userReviews}}
        }
        default:
            return state
    }
}
