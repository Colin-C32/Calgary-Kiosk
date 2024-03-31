import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./Header.css";

export const Header = ({ setPage, previousPage, title, color = "black" }) => {
  return (
    <div class="header-container">
      <ArrowBackIcon
        style={color==='red' ? {'visibility': 'hidden'} : {}}
        className="arrow"
        sx={{ fontSize: 40, marginLeft: "5%" }}
        onClick={() => {
          setPage(previousPage);
        }}
      />
      <div class="header-div">
        <h1 class={`header-text ${color === "red" ? "red" : ""}`}>{title}</h1>
      </div>
    </div>
  );
};
