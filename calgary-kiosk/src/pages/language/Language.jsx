import React, { useState, useEffect } from "react";

const Language = ({ setPage }) => {
  return (
    <div>
      PAGE: LANGUAGE
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

export default Language;
