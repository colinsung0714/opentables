import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';


const Maps = ({ apiKey, lat, lng, title }) => {
    const containerStyle = {
        width: '300px',
        height: '300px',
    };

    const center = {
        lat: lat,
        lng: lng,
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
    });

    return (
        <>
            {isLoaded && (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={14}
                >
                    <Marker position={center} title={title}/>
                </GoogleMap>
            )}
        </>
    );
};

export default React.memo(Maps);