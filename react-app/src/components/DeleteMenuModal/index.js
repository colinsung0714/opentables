import React from "react";
import '../DeleteModalButton/DeleteModalButton.css'
import '../DeleteMenuModal/DeleteMenuModal.css'
import { useModal } from "../../context/Modal";
import { fetchDeleteMenu, fetchDeleteMenuItem } from "../../store/menu"
import { fetchAllRestaurants, fetchSingleRestaurants } from "../../store/restaurant"
import { useDispatch } from "react-redux"
export const DeleteMenuModal = ({ setMenuItems, restaurant, item, type, restaurantId }) => {
    const { closeModal } = useModal()
    const menuId = restaurant?.menus[0].id
    const dispatch = useDispatch()
    const deleteMenu = () => {
        dispatch(fetchDeleteMenu(menuId)).then(() => dispatch(fetchAllRestaurants())).then(() => closeModal())
    }
    const deleteMenuItem = () => {
        dispatch(fetchDeleteMenuItem(item.id)).then(()=>dispatch(fetchSingleRestaurants(restaurantId))).then(()=>setMenuItems(prev=>{
            const oldList = prev
            const newList = oldList.filter(el => el.id !== item.id)
            return [...newList]
        })).then(()=>closeModal())
    }
   
    return (
        <div className="delte-modal-container">
            <div className="delete-upper-container"><img src='https://opentables.s3.us-west-1.amazonaws.com/onetableicon.png' /><h2>Open Tables</h2></div>
            {
                type === 'update' ? 
                <div className="delete-lower-container">
                    <div id="menu-delete-button">{`Are you sure you want to delete ${item.name} from the menu?`}</div>
                    <button onClick={deleteMenuItem}>Yes</button>
                    <button onClick={() => closeModal()}>No</button>
                </div>
                    :
                    <div className="delete-lower-container">
                        <div id="menu-delete-button">{`Are you sure to delete ${restaurant.name}'s menu?`}</div>
                        <button onClick={deleteMenu}>Yes</button>
                        <button onClick={() => closeModal()}>No</button>
                    </div>
            }
        </div>
    )
}