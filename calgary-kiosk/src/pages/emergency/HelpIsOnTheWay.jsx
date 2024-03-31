import React, { useState, useEffect } from "react";
import "./Emergency.css";
import { Header } from "../../components/UI/Header";
import { Taskbar } from "../../components/taskbar/Taskbar";
import "./HelpIsOnTheWay.css";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

const EmergencyHome = ({ setPage }) => {
  const [selectedCategory, setSelectedCategory] = useState("none");
  const [title, setTitle] = useState("HELP IS ON THE WAY")
  return (
    <div class="emergency-contact-container">
      <Header
        setPage={setPage}
        previousPage="Emergency"
        title={title}
        color="red"
      />
      <div class="button-container">
        <div
          onClick={() => {
            setSelectedCategory("Medical");
          }}
          class={`emergency-category ${
            selectedCategory === "Medical" ? "selected" : ""
          }`}
        >
          <MedicalServicesIcon />
          Medical Issue
        </div>
        <div
          onClick={() => {
            setSelectedCategory("Safety");
          }}
          class={`emergency-category ${
            selectedCategory === "Safety" ? "selected" : ""
          }`}
        >
          <HealthAndSafetyIcon />
          Personal Safety
        </div>
        <div
          onClick={() => {
            setSelectedCategory("Fire");
          }}
          class={`emergency-category ${
            selectedCategory === "Fire" ? "selected" : ""
          }`}
        >
          <WhatshotIcon />
          Fire / Smoke
        </div>
      </div>
      <div class="subtitle">
        Please select a category so our first responders can be better equipped
        to assist you
      </div>
      <div class="emergency-input-container">
        <textarea
          type="text"
          placeholder="Optionally describe your issue here..."
          class="emergency-input"
        />
      </div>
      <div class="information-option submit" onClick={() => {setTitle('REQUEST RECEIVED')}}>Submit Request</div>
      <div
        class="emergency-option cancel"
        onClick={() => {
          setPage("Emergency");
        }}
      >
        Cancel Request
      </div>
      <Taskbar setPage={setPage} />
    </div>
  );
};

export default EmergencyHome;
