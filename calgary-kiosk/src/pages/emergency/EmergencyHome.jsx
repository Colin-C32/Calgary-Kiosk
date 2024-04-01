import React, { useState, useEffect } from "react";
import "./Emergency.css";
import { Header } from "../../components/UI/Header";
import { Taskbar } from "../../components/taskbar/Taskbar";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const tableData = [
  { name: "Emergency Services", number: "911" },
  { name: "Distress Centre Calgary", number: "403-266-HELP" },
  { name: "Health Link Alberta", number: "811" },
  { name: "Poison & Drug Info Service", number: "1-800-332-1414" },
  { name: "Mental Health Helplines", number: "1-877-303-2642" },
  { name: "Non Emergency Police", number: "403-266-1234" },
  { name: "Women's Emergency Shelter", number: "403-234-SAFE" },
  { name: "ENMAX (Power Outages)", number: "403-514-6100" },
  { name: "City Services", number: "311" },
];

const EmergencyHome = ({ setPage }) => {
  return (
    <div class="emergency-contact-container">
      <Header setPage={setPage} previousPage="Home" title="Emergency Contact" />
      <div class="button-container">
        <div
          onClick={() => {
            setPage("HelpOnWay");
          }}
          class="emergency-option"
        >
          Request Immediate Help
        </div>
      </div>
      <div class="contact-info-container">
        <div class="title">Contact Information</div>
        <table class="contact-info-table">
          {tableData.map((item) => {
            return (
              <tr>
                <td>{item.name}</td>
                <td>{item.number}</td>
                <td>{<LocalPhoneIcon/>}</td>
              </tr>
            );
          })}
        </table>
      </div>
      <Taskbar setPage={setPage} />
    </div>
  );
};

export default EmergencyHome;
