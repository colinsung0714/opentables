import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getKey } from "../../store/maps";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';


export const Test = () => {
    const [address, setAddress] = useState('')
    const dispatch = useDispatch()
    const apiKey = useSelector(state => state.maps.key)


  useEffect(() => {
    dispatch(getKey())
}, []);
    console.log(address)
    return (
        <div className="App" style={{width:"300px"}}>
            {apiKey && <GooglePlacesAutocomplete
                apiKey={apiKey}
                selectProps={{
                  address,
                  onChange: setAddress
                }}
            />}
        </div>
    )
}