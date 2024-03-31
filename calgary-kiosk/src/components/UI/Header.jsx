import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./Header.css";

export const Header = ({ setPage, previousPage, title }) => {
  return (
    <div class="header-container">
      <ArrowBackIcon
        className="arrow"
        sx={{ fontSize: 40, marginLeft: "5%" }}
        onClick={() => {
          setPage(previousPage);
        }}
      />
      <div class="header-div">
        <h1 class="header-text">{title}</h1>
      </div>
    </div>
  );
};
