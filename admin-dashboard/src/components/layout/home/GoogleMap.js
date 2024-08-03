import React, { useEffect, useRef } from 'react';

const GoogleMap = ({ address }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        });

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address }, (results, status) => {
            if (status === 'OK') {
                map.setCenter(results[0].geometry.location);
                new window.google.maps.Marker({
                    map,
                    position: results[0].geometry.location,
                });
            } else {
                console.error('Geocode was not successful for the following reason: ' + status);
            }
        });
    }, [address]);

    return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default GoogleMap;
