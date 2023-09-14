const ALL_MENU_CURRENT_RESTAURANT = '/:restaurantId/menus'
const ADD_MENU ='/:restaurantId/new'

const allMenusforRestaurant = (menuItems) => {
    return {
        type:ALL_MENU_CURRENT_RESTAURANT,
        menuItems
    }
}

const newMenuforRestaurant = (menuItems) => {
    return {
        type:ADD_MENU,
        menuItems
    }
}

export const fetchAllMenusForRestaurant = (restaurantId) => async dispatch => {
    const res = await fetch(`/api/menus/restaurants/${restaurantId}/menus`)
    if(res.ok) {
        const data = await res.json()
        dispatch(allMenusforRestaurant(data))
    } else {
        const error = await res.json()
        throw error
    }
}

export const fetchNewMenuforRestaurant = (menuItems, restaurantId) => async dispatch => {
    const res = await fetch(`/api/menus/restaurants/${restaurantId}/new`, {
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify(menuItems)
    })
    if(res.ok) {
        const data = await res.json()
        dispatch(newMenuforRestaurant(data))
    } else {
        const error = await res.json()
        throw error
    }
}

export const fetchUpdateMenuforRestaurant = (menuItems, menuId) => async dispatch => {
    const res = await fetch(`/api/menus/restaurants/${menuId}/edit`, {
        method:"PUT",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify(menuItems)
    })
    if(res.ok) {
        const data = await res.json()
        dispatch(newMenuforRestaurant(data))
    } else {
        const error = await res.json()
        throw error
    }
}

const initialState = { currentRestaurantMenus:{}}

export default function menusReducer(state=initialState, action) {
    switch(action.type) {
        case ALL_MENU_CURRENT_RESTAURANT:{
            const newState = { currentRestaurantMenus:{} }
            action.menuItems.menuItems?.forEach(item =>{
                newState.currentRestaurantMenus[item.id] = item
            })
            return newState
        }
        case ADD_MENU:{
            const newState = { currentRestaurantMenus:{} }
            const newItemList = {}
            action.menuItems.menuItems?.forEach(item =>{
                newItemList[item.id] = item
            })
            return {...newState, currentRestaurantMenus:{...newState.currentRestaurantMenus, ...newItemList}}
        }
        default:
            return state
    }
}
