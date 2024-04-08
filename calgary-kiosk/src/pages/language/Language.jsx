import React, { useState } from "react";
import "./Language.css";
import { Header } from "../../components/UI/Header";
import { useTranslation } from "react-i18next";
import Modal from "./Modal";
import "./Modal.css";

const LanguageSelection = ({ setPage }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [showModal, setShowModal] = useState(false);
  const { t, i18n } = useTranslation();

  const selectLanguage = (language) => {
    console.log(`${language} selected`);
    setSelectedLanguage(language);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const confirmSelection = () => {
    changeLanguage("ko");
    if (selectedLanguage !== "English") {
      setShowModal(true);
    } else {
      console.log("English confirmed");
      setPage("Home");
    }
  };

  const closeModalAndGoHome = () => {
    setShowModal(false);
    setPage("Home");
    setTimeout(() => {
      setSelectedLanguage("English");
    }, 5000);
  };

  const languages = [
    { name: "English" },
    { name: "French", nativeName: "Français" },
    { name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
    { name: "Chinese", nativeName: "中文" },
    { name: "Español", nativeName: "Español" },
    { name: "Arabic", nativeName: "العربية" },
    { name: "Urdu", nativeName: "اردو" },
    { name: "Hindi", nativeName: "हिंदी" },
    { name: "Vietnamese", nativeName: "Tiếng Việt" },
    { name: "German", nativeName: "Deutsch" },
    { name: "Italian", nativeName: "Italiano" },
    { name: "Korean", nativeName: "한국어" },
    { name: "Russian", nativeName: "Русский" },
    { name: "Somali", nativeName: "Soomaali" },
  ];

  return (
    <div>
      <Header setPage={setPage} previousPage="Home" title="Select Langauge" />
      <div className="languages-grid">
        {languages.map((language) => (
          <button
            key={language.name}
            onClick={() => selectLanguage(language.name)}
            className={
              selectedLanguage === language.name
                ? "selected-button language-button"
                : "language-button"
            }
          >
            {language.name}
            {language.nativeName && ` (${language.nativeName})`}
          </button>
        ))}
      </div>
      <div className="footer">
        <button className="cancel-button" onClick={() => setPage("Home")}>
          ✖ {t("Cancel")}
        </button>
        <button className="confirm-button" onClick={confirmSelection}>
          ✔ {t("Confirm")}
        </button>
      </div>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        message="Sorry, the current language available is only English. Other languages are under BETA development."
        onConfirm={closeModalAndGoHome}
        countdown={10}
      />
    </div>
  );
};

export default LanguageSelection;
