import React from 'react';
import GoogleMap from '../../../components/google-maps/google-maps';
import { Header } from "../../../components/UI/Header" 

const TransitRoutes = ({ setPage }) => {
  const apiKey = 'AIzaSyDywEmVrxAsXW4uDgQUSn3xZlQxkbC8syM'; // Replace with your actual API key

  return (
    <div>
    <Header
        setPage={setPage}
        previousPage="Transit"
        title="Transit Routes"
      />
      <GoogleMap apiKey={apiKey} />
    </div>
  );
};

export default TransitRoutes;