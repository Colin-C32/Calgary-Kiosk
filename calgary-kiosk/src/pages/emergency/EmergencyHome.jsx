import React, { useState, useEffect } from "react";

const EmergencyHome = ({ setPage }) => {
  return (
    <div>
      PAGE: EMERGENCY
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

export default EmergencyHome;
