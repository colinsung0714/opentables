import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { login } from "../../store/session";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const handleDemoUser = (e) => {
    e.preventDefault();
    dispatch(login('demo@aa.io', 'password'))
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button id="user-button" onClick={openMenu}>
        {user ? <img src={user.profilePic} /> : <i className="fas fa-user-circle" />}
        <i className="fas fa-crown" style={{ "color": "#eca33c" }} />
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <h3>Hello, {user.firstName}!</h3>
            <div>{user.email}</div>
            <div style={{fontWeight:"bold", cursor:"pointer"}} onClick={() => history.push('/restaurants/new', {type:'create'})}>Add My Restaurant</div>
            <div style={{fontWeight:"bold", cursor:"pointer"}} onClick={() => history.push(`/user/${user.id}/restaurants`)}>My Restaurants</div>
            <div style={{fontWeight:"bold", cursor:"pointer"}} onClick={() => history.push(`/user/${user.id}/reservations`)}>My Reservations</div>
            <div style={{fontWeight:"bold", cursor:"pointer"}} onClick={() => history.push(`/user/${user.id}/menus`)}>My Restaurant's Menu</div>
            <div>
              <button id="Logout-profile-dropdown" onClick={handleLogout}>Log Out</button>
            </div>
          </>
        ) : (
          <div style={{display:"flex", gap:"10px"}}>
            <OpenModalButton
              className='login-button'
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              className='signup-button'
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            <button id="demouser-button" onClick={handleDemoUser}>Demo User</button>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
