/* global google */

import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const GoogleMap = ({ apiKey }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey,
      version: '2.19.3', // Specify the version of the API
    });

    loader.load().then(() => {
      new google.maps.Map(mapContainerRef.current, {
        center: { lat: 40.7128, lng: -74.006 },
        zoom: 10,
      });
    });
  }, [apiKey]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
};

export default GoogleMap;