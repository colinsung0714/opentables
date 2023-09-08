import React from "react";
import '../UserNavigation/UserNavigation.css'
export const UserNavigation = ({currentUser, type}) => {

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
            <div style={type === 'reservations' ? {fontWeight:'bold'} : null}>Reservations</div>
            <div style={type === 'restaurants' ? {fontWeight:'bold'} : null}>Restaurants</div>
        </div>
        </>
    )
}