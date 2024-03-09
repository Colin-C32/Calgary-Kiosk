import React, { useState, useEffect } from "react";

const Home = ({ setPage }) => {
  return (
    <div>
      <div
        onClick={() => {
          setPage("Transit");
        }}
      >
        Transit
      </div>
      <div
        onClick={() => {
          setPage("Emergency");
        }}
      >
        Emergency
      </div>
      <div
        onClick={() => {
          setPage("Language");
        }}
      >
        Language
      </div>
    </div>
  );
};

export default Home;
