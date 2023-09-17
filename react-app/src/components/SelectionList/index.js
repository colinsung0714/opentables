import React, {useState} from "react";
import '../SelectionList/SelectionList.css'

export const SelectionList = ({suggestion, setSearch}) => {
    const [focus, setFocus] = useState(false)
    const handleSuggestion = e => {
        e.stopPropagation()
        setSearch(e.target.value)
    }
  
    return (
        <div style={focus ? {backgroundColor:"lightgray"}:null} className="suggestion-input-container">
             <i style={focus ? {color:"white"} : {color:"gray"}} className="fas fa-search"></i>
             <input id={"suggestion-input"} style={focus? {color:"white"}:{color:"gray"}} readOnly value={suggestion.name} onMouseEnter={()=>setFocus(true)} onMouseLeave={()=>setFocus(false)} onClick={e=>handleSuggestion(e)}/>
        </div>
        
    )
}