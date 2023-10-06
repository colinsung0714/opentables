import React, { useState, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import "../Maps/Maps.css"

const Maps = ({ lat, lng, title, type, restaurant, setSteps}) => {
    const apiKey = useSelector(state => state.maps.key)
    const [directionBox, setDirectionBox] = useState(false)
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const originRef = useRef()
    const [map, setMap] = useState(/** @type google.maps.Map*/(null))
    const restaurantAddress = `${restaurant?.street}, ${restaurant?.city}, ${restaurant?.state}`
    const containerStyle = {
        width: '300px',
        height: '300px',
    };
    const containerStyle2 = {
        width: '100%',
        height: '800px'
    }
    const center = {
        lat: type === 'reservation' ? restaurant.lat : lat,
        lng: type === 'reservation' ? restaurant.lng : lng,
    };
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
        libraries: ['places'],
    });
    const showingDirectionBOx = () => {
        setDirectionBox(true)
    }

    const disableDirectionBOx = () => {
        setDirectionBox(false)
    }

    async function calculateRoute() {
        if (originRef.current.value === '') {
            return
        }
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: originRef.current.value,
            destination: restaurantAddress,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
        const steps = [...results.routes[0].legs[0].steps]
        setSteps(steps)
    }

    function clearRoute() {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        originRef.current.value = ''
    }
    return (
        <>
            {(
                isLoaded &&
                <div>
                    {(type === 'reservation' && !directionBox) && <button onClick={showingDirectionBOx} style={{ marginBottom: "40px", width: "200px" }}>Get Direction</button>}
                    {(type === 'reservation' && directionBox) &&
                        <div id='route-action-container'>
                            <div id='route-action-upper'>
                                <Autocomplete>
                                    <input id="start-input" ref={originRef} placeholder='Type your location' type='text' />
                                </Autocomplete>
                                <input id='destination-input' value={restaurantAddress} type='text' />
                                <button onClick={calculateRoute}>Get Route</button>
                                <button onClick={clearRoute}>Clear</button>
                            </div>
                            <div id='route-action-bottom'>
                                <div id='distance-box'>{`Distance: ${distance}`}</div>
                                <div id='duration-box'>{`Duration: ${duration}`}</div>
                                <div id='cancel-rollback-box'>
                                    <div id='rollback-box'>
                                        <i onClick={() => map.panTo(center)} className="fas fa-redo-alt"></i>
                                    </div>
                                    <div style={{ paddingLeft: "10px" }}>
                                        <i onClick={disableDirectionBOx} id="cancel-box-icon" className="fas fa-times"></i>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    <GoogleMap
                        mapContainerStyle={type === 'reservation' ? containerStyle2 : containerStyle}
                        center={center}
                        zoom={14}
                        onLoad={(map) => setMap(map)}
                    >
                        {!directionsResponse && <Marker position={center} title={title} />}
                        {directionsResponse && (
                            <DirectionsRenderer directions={directionsResponse} />
                        )}
                    </GoogleMap>
                </div>
            )}
        </>
    );
};

export default React.memo(Maps);