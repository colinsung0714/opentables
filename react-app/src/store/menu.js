const ALL_MENU_CURRENT_RESTAURANT = '/:restaurantId/menus'
const ADD_MENU ='/:restaurantId/new'
const DELETE_MENU = '/:menuId/delete'
const DELETE_MENUITEM = '/:menuId/menuitems/:menuitemId'
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

const deleteMenu = (msg) => {
    return {
        type:DELETE_MENU,
        msg
    }
}

const deleteMenuItem = (menuItem) => {
    return {
        type:DELETE_MENUITEM,
        menuItem
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

export const fetchDeleteMenu = menuId => async dispatch => {
    const res = await fetch(`/api/menus/${menuId}/delete`, {
        method:'DELETE'
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(deleteMenu(data))
    } else {
        const error = await res.json()
        throw error
    }
}

export const fetchDeleteMenuItem = (menuItemId) => async dispatch => {
    const res = await fetch(`/api/menus/menuitems/${menuItemId}`, {
        method:'DELETE'
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(deleteMenuItem(data))
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
            console.log(action.menuItems)
            action.menuItems.menuItems?.forEach(item =>{
                newItemList[item.id] = item
            })
            return {...newState, currentRestaurantMenus:{...newState.currentRestaurantMenus, ...newItemList}}
        }
        case DELETE_MENU: {
            const newState = {currentRestaurantMenus:{} }
            return newState
        }
        case DELETE_MENUITEM: {
            const newState = {...state, currentRestaurantMenus:{...state.currentRestaurantMenus}}
            delete newState.currentRestaurantMenus[action.menuItem.id]
            return {...newState, currentRestaurantMenus:{...newState.currentRestaurantMenus}}
        }
        default:
            return state
    }
}
