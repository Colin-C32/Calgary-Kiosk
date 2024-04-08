
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/UI/Header";
import { Taskbar } from "../../components/taskbar/Taskbar";
import "./Emergency.css";
import "./HelpIsOnTheWay.css";

const EmergencyHome = ({ setPage }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [title, setTitle] = useState("REQUESTING HELP....");
  const [submitButtonText, setSubmitButtonText] = useState("Submit Request");
  const [countdown, setCountdown] = useState(8);
  const [timerActive, setTimerActive] = useState(true);
  const [progress, setProgress] = useState(0);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) => {
      const updatedCategories = prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category];
      
      if (updatedCategories.length !== prev.length && submitButtonText !== "Submitting...") {
        setSubmitButtonText("Update Request");
      }
      setTimerActive(false);
      setProgress(0); 
      return updatedCategories;
    });
  };

  const handleButtonClick = () => {
    if (submitButtonText === "Update Request" || submitButtonText === "Request Submitted") {
      setTitle("REQUEST UPDATED");
      setSubmitButtonText("Submitting..."); 
      setTimeout(() => {
        
        setSubmitButtonText("Submitted");
        setTimeout(() => {
          
          setSubmitButtonText("Submit Request");
        }, 2000);
      }, 1000);
    }
  };

  useEffect(() => {
    let interval = null;
    if (timerActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          return prevCountdown - 1; 
        });
        setProgress((prevProgress) => prevProgress + (100 / 8));
      }, 1000);
    } else if (countdown === 0) {
      clearInterval(interval);
      setTitle("REQUEST SUBMITTED");
      setSubmitButtonText("Submitted");
      setTimerActive(false);
      setTimeout(() => {
        setSubmitButtonText("Request Submitted");
        setProgress(0); 
      }, 1000); 
    }
    return () => clearInterval(interval);
  }, [timerActive, countdown]);

  return (
    <div className="emergency-contact-container">
      <Header setPage={setPage} previousPage="Emergency" title={title} color="red" />
      <div className="button-container">
        <div onClick={() => toggleCategory("Medical")} className={`emergency-category ${selectedCategories.includes("Medical") ? "selected" : ""}`}>
          <MedicalServicesIcon />
          Medical (EMS)
        </div>
        <div onClick={() => toggleCategory("Safety")} className={`emergency-category ${selectedCategories.includes("Safety") ? "selected" : ""}`}>
          <HealthAndSafetyIcon />
          Police Services
        </div>
        <div onClick={() => toggleCategory("Fire")} className={`emergency-category ${selectedCategories.includes("Fire") ? "selected" : ""}`}>
          <WhatshotIcon />
          Fire / Smoke
        </div>
      </div>
      <div className="subtitle">Please select a category so our first responders can be better equipped to assist you</div>
      <div className="information-option submit" style={{ '--progress': `${progress}%` }} onClick={handleButtonClick}>
        <span className="submit-text">{submitButtonText}</span>
        <span className="submit-progress" style={{ width: `${progress}%` }}></span>
      </div>
      <div className="emergency-option cancel" onClick={() => setPage("Emergency")}>
        Cancel Request
      </div>
      <Taskbar setPage={setPage} />
    </div>
  );
};

export default EmergencyHome;
