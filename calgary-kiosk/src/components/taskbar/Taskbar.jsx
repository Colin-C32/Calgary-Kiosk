import React from "react";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import HomeIcon from "@mui/icons-material/Home";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import "./Taskbar.scss";

export const Taskbar = ({ setPage }) => {
  return (
    <div class="taskbar-container">
      <QrCodeScannerIcon
        className="taskbar-icon"
        sx={{ fontSize: 85, marginLeft: "5%" }}
      />
      <HomeIcon
        onClick={() => {
          setPage("Home");
        }}
        className="taskbar-icon"
        sx={{ fontSize: 85 }}
      />
      <GTranslateIcon
        onClick={() => {
          setPage("Language");
        }}
        className="taskbar-icon"
        sx={{ fontSize: 85, marginRight: "5%" }}
      />
    </div>
  );
};
