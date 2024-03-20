import React, { useState, useEffect } from "react";

const PointsofInterest = ({ setPage }) => {
  return (
    <div>
      PAGE: PointsOfInterest
      <div
        onClick={() => {
          setPage("Home");
        }}
      >
        Go back to home goog
      </div>
    </div>
  );
};

export default PointsofInterest;
