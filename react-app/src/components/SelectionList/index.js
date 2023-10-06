import React, {useState} from "react";
import { dateformatConverter } from "../helper";
import { useDispatch } from "react-redux";
import { fetchSearchRestaurant } from "../../store/restaurant";
import '../SelectionList/SelectionList.css'

export const SelectionList = ({suggestion, setSearch, party, startDate, time, setError, setSuggestions }) => {
    const [focus, setFocus] = useState(false)
    const dispatch = useDispatch()
    const handleSuggestion = e => {
        e.stopPropagation()
        e.preventDefault();
        const searchData = {
            party,
            name: e.target.value,
            date_time: dateformatConverter(startDate, time)
        }
        dispatch(fetchSearchRestaurant(searchData)).catch(e => setError(e))
        setError({})
        setSuggestions([])
        setSearch('')

    }
    return (
        <div style={focus ? {backgroundColor:"lightgray"}:null} className="suggestion-input-container">
             <i style={focus ? {color:"white"} : {color:"gray"}} className="fas fa-search"></i>
             <input id={"suggestion-input"} style={focus? {color:"white"}:{color:"gray"}} readOnly value={suggestion.name} onMouseEnter={()=>setFocus(true)} onMouseLeave={()=>setFocus(false)} onClick={e=>{
                handleSuggestion(e)
                }}/>
        </div>
        
    )
}