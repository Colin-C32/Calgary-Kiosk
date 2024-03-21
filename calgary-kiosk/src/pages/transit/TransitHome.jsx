import React, { useState, useEffect } from "react";

const TransitHome = ({ setPage }) => {
  return (
    <div>
      PAGE: TRANSIT
      <div
        onClick={() => {
          setPage("FairInformation");
        }}
      >
        Go to FairInformation
      </div>
      <div
        onClick={() => {
          setPage("Home");
        }}
      >
        Go back to home
      </div>
    </div>
  );
};

export default TransitHome;
