import React from "react";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import HomeIcon from "@mui/icons-material/Home";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import { QRCodeSVG } from 'qrcode.react';
import "./Taskbar.css";

export const Taskbar = ({ setPage, qrLink }) => {
  console.log(qrLink)
  return (
    <div className="taskbar-container">
      {qrLink ? (
        <div className="taskbar-qr">
          <QRCodeSVG value={qrLink} size={85} level={"M"}  />
        </div>
      ) : (
        <div className="taskbar-qr">
          <QrCodeScannerIcon
            sx={{ fontSize: 85, color: '#dfdfdf' }}
          />
          <div className="taskbar-qr-overlay">No QR Code</div>
        </div>      
      )}
      <HomeIcon
        onClick={() => {
          setPage("Home");
        }}
        classNameName="taskbar-icon"
        sx={{ fontSize: 85 }}
      />
      <GTranslateIcon
        onClick={() => {
          setPage("Language");
        }}
        classNameName="taskbar-icon"
        sx={{ fontSize: 85, marginRight: "5%" }}
      />
    </div>
  );
};
