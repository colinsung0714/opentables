import React from "react";
import { useHistory } from "react-router-dom";
import '../UserNavigation/UserNavigation.css'
export const UserNavigation = ({currentUser, type}) => {
    const history = useHistory()

    return (
        <>
        <div className="user-manage-restaurant-container">
            <div>
                <div className="user-nav-bar">
                    <img src={currentUser.profilePic} />
                    <div className="user-info-nav-container">
                        <h2>Hi, {currentUser.firstName}</h2>
                        <div>Member since {currentUser.createdAt.slice(8, 16)}</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="nav-menu-bar">
            <div id="navi-to-reservation" onClick={()=>history.push(`/user/${currentUser.id}/reservations`)} style={type === 'reservations' ? {fontWeight:'bold'} : null}>Reservations</div>
            <div id="navi-to-restaurant" onClick={()=>history.push(`/user/${currentUser.id}/restaurants`)} style={type === 'restaurants' ? {fontWeight:'bold'} : null}>Restaurants</div>
            <div id="navi-to-restaurant" onClick={()=>history.push(`/user/${currentUser.id}/menus`)} style={type === 'menus' ? {fontWeight:'bold'} : null}>Menus</div>
        </div>
        </>
    )
}