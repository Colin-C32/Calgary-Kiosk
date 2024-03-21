import React from "react";
import { Taskbar } from "../../components/taskbar/Taskbar";
import "./Home.scss";

const Home = ({ setPage }) => {
  return (
    <div>
      <div class="welcome-header-container">
        <h1 class="welcome-header">Welcome to Calgary</h1>
        <h1 class="welcome-header" id="non-english-header">
          Bienvenue à Calgary
        </h1>
      </div>
      <div class="information-container">
        <div
          onClick={() => {
            setPage("Transit");
          }}
          class="information-option"
        >
          Transit Information
        </div>
        <div
          onClick={() => {
            setPage("PointsOfInterest");
          }}
          class="information-option"
        >
          Points of Interest
        </div>
      </div>
      <div
        onClick={() => {
          setPage("Emergency");
        }}
        class="emergency-option"
      >
        Emergency Contact
      </div>
      <div className="instructions">
        <div class="box" id="scan-text">
          <p>Scan to take me with you!</p>
          <p class="french-text">Scanne pour m'emmener avec toi!</p>
        </div>

        <div class="box" id="language-text">
          <p>Change language!</p>
          <p class="french-text">Changer de langue!</p>
        </div>
      </div>
      <Taskbar setPage={setPage} />
    </div>
  );
};

export default Home;
