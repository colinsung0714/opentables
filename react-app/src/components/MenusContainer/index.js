import React from "react";
import '../MenusContainer/MenusContainer.css'
import { sameTypeMenuList } from "../helper";
export const MenusContainer = ({ itemType, restaurantMenus }) => {
    const sameTypeMenu = sameTypeMenuList(itemType, restaurantMenus)
    return (
        <div className="same-menu-type-conatiner">
            <div id="item-type-menu">{itemType}</div>
            <div className="grid-menu-container">
                {
                    sameTypeMenu.map(item => {
                        return (
                            <div className="menu-content-container" key={item.id}>
                                <div className="name-price-menu-container">
                                    <div>{item.name}</div><div style={{paddingRight:"10px"}}>{`$${item.price}`}</div>
                                </div>
                                <div style={{width:'100%'}}>
                                    {item.description}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}