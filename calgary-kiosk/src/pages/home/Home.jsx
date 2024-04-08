import React from "react";
import { Taskbar } from "../../components/taskbar/Taskbar";
import { useTranslation } from "react-i18next";
import "./Home.css";

const Home = ({ setPage }) => {
  const { t } = useTranslation();
  return (
    <div>
      <div class="welcome-header-container">
        <h1 class="welcome-header">Welcome to Calgary</h1>
        <h1 class="welcome-header" id="non-english-header">
          {t("Bienvenue à Calgary")}
        </h1>
      </div>
      <div class="information-container">
        <div
          onClick={() => {
            setPage("Transit");
          }}
          class="information-option"
        >
          {t("Transit Information")}
        </div>
        <div
          onClick={() => {
            setPage("PointsOfInterest");
          }}
          class="information-option"
        >
          {t("Points of Interest")}
        </div>
      </div>
      <div
        onClick={() => {
          setPage("Emergency");
        }}
        class="emergency-option"
      >
        {t("Emergency Contact")}
      </div>
      <div className="instructions">
        <div class="box" id="scan-text">
          <p>Scan to take me with you!</p>
          <p class="french-text">{t("Scanne pour m'emmener avec toi!")}</p>
        </div>

        <div class="box" id="language-text">
          <p>Change language!</p>
          <p class="french-text">{t("Changer de langue!")}</p>
        </div>
      </div>
      <Taskbar setPage={setPage} />
    </div>
  );
};

export default Home;
