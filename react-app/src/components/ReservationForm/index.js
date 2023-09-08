import React from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import '../ReservationForm/ReservationForm.css'
export const ReservationForm = () => {
    const currentUser = useSelector(state=>state.session.user)
    const history = useHistory()
    const {userId, restaurantId} = useParams()
    if(Number(userId) !== currentUser.id) history.push('/')
    return (
        <div className="reservation-form-container">
           <div>Your current reservation</div>
           <div>
                <img/>
                <div>
                    <div>title</div>
                    <div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
           </div>
           <div>Modify your reservation</div>
           <form>
                <div>
                    <input/>
                </div>
                <div>
                    <input/>
                </div>
                <div>
                    <input/>
                </div>
                <button type="submit">Find a new table</button>
           </form>
        </div>
    )
}