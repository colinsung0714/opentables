import React, { useEffect, useState } from "react";
import { fetchNewMenuforRestaurant, fetchUpdateMenuforRestaurant } from "../../store/menu";
import '../CreateMenuForm/CreateMenuForm.css'
import { useLocation, useHistory } from "react-router-dom";
import { priceDigitChecker } from "../helper";
import { useDispatch } from "react-redux";
import { DeleteMenuModal } from "../DeleteMenuModal"
import OpenModalButton from "../OpenModalButton";
export const CreateMenuForm = () => {
    const location = useLocation()
    const history = useHistory()
    const type = location.state ? location.state.type : null
    const restaurant = location.state ? location.state.restaurant : null
    const dispatch = useDispatch()
    const menuId = type === 'update' ? restaurant.menus[0].id : null
    const [menuItems, setMenuItems] = useState(type === 'update' ? [...restaurant.menus[0].menu_items] : [{ name: "", item_type: "", price: "", description: "" }]);
    const [error, setError] = useState({})
    const handleClick = (e) => {
        e.preventDefault()
        setMenuItems((prevItems) => [...prevItems, { name: "", item_type: "", price: "", description: "" }]);
    };

    const updateMenuItem = (idx, field, value) => {
        const updatedItems = [...menuItems];
        updatedItems[idx][field] = value;
        setMenuItems(updatedItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if (type === 'update') dispatch(fetchUpdateMenuforRestaurant(menuItems, menuId)).then(() => history.push(`/restaurants/${restaurant.id}`))
        else dispatch(fetchNewMenuforRestaurant(menuItems, restaurant.id)).then(() => history.push(`/restaurants/${restaurant.id}`))
    }
    useEffect(() => {
        const errorObj = {}
        if (priceDigitChecker(menuItems)) errorObj.price = '*Format: $xxxx.xx'
        setError(errorObj)
    }, [menuItems])


    return (
        <div className="whole-menu-form">

            <div className="intro-new-restaurant">
                <h2>Dig into the world's most complete restaurant platform</h2>
                <div>The most valuable diner network that's 20+ years in the making</div>
            </div>
            <form onSubmit={handleSubmit} className="menu-form-main-container">

                <h2 style={{ textAlign: "center" }}>{`Add a new menu for ${restaurant.name}`}</h2>
                <div id="new-menu-form-container">
                    {menuItems.map((item, idx) => (
                        <div key={idx} className="input-menu-item-container">
                            <div id="input-menu-item-list">
                                <div style={{display:'flex', alignItems:"center", gap:"10px"}}>
                                    <div style={{ fontWeight: "bold" }}>{`Menu Item #${idx + 1}`}</div>
                                    {type === 'update' && item.id ? <OpenModalButton
                                        className='menuitem-delete-button'
                                        buttonText="Delete item"
                                        modalComponent={<DeleteMenuModal item={item} type={'update'} setMenuItems={setMenuItems} />}
                                    /> : null}
                                </div>

                                <div key={idx} id="menu-input-conatiner" style={{ display: "flex", flexDirection: "column" }}>
                                    <div id="input-box-container">
                                        <div>{`Name`}</div>
                                        <input
                                            type="text"
                                            value={item.name}
                                            placeholder="ex. Margherita"
                                            required
                                            maxLength={50}
                                            onChange={(e) => updateMenuItem(idx, "name", e.target.value)}
                                        />
                                    </div>
                                    <div id="input-box-container">
                                        <div>{`Type`}</div>
                                        <input
                                            value={item.item_type}
                                            type="text"
                                            required
                                            placeholder="ex. Pizza"
                                            maxLength={50}
                                            onChange={(e) => updateMenuItem(idx, "item_type", e.target.value)}
                                        />
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                            <div>{`Price ($)`}</div>
                                            <p style={{ color: "red" }}>{error.price && error.price}</p>
                                        </div>
                                        <input
                                            type="number"
                                            value={item.price}
                                            placeholder="ex. 18.00"
                                            required
                                            onChange={(e) => updateMenuItem(idx, "price", e.target.value)}
                                        />
                                    </div>
                                    <div id="input-box-container">
                                        <div>{`Description`}</div>
                                        <textarea
                                            style={{ height: "50px" }}
                                            type="text"
                                            value={item.description}
                                            placeholder="ex. San Marzano Tomato Sauce, Buffalo Mozzarella, Fresh Basil, Extra Virgin Olive Oil"
                                            required
                                            maxLength={190}
                                            onChange={(e) => updateMenuItem(idx, "description", e.target.value)}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                    <div style={{ padding: "10px 0" }} className="menu-button-container">
                        <button onClick={e => handleClick(e)}>More Menu</button>
                        <button style={Object.values(error).length > 0 ? { backgroundColor: "#ccc", color: "#666", cursor: "not-allowed" } : null} type="submit">{type === 'update' ? 'Update Menu' : 'Submit'}</button>
                    </div>
                    <div id="empty-space" style={{ height: "50px" }}></div>
                </div>
            </form>
        </div>
    );
};
