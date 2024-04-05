/* global google */

import { Header } from "../../../components/UI/Header" 
import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const TransitRoutes = ({ setPage }) => {
  const apiKey = 'AIzaSyDywEmVrxAsXW4uDgQUSn3xZlQxkbC8syM'; 

  const GoogleMap = ({ apiKey }) => {
    const mapContainerRef = useRef(null);
  
    useEffect(() => {
      const loader = new Loader({
        apiKey,
        version: 'weekly', // Specify the version of the API
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

  return (
    <div>
    <Header
        setPage={setPage}
        previousPage="Transit"
        title="Transit Routes"
      />
      <div className= "google-map" style={{height: 200}}>
      <GoogleMap apiKey={apiKey} />
      </div>
    </div>
  );
};

export default TransitRoutes;