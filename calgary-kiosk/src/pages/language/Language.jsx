import React, { useState } from 'react';
import './Language.css';
import Modal from './Modal'; // Additional pop up for BETA development
import './Modal.css';

const LanguageSelection = ({ setPage }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showModal, setShowModal] = useState(false);

  const selectLanguage = (language) => {
    console.log(`${language} selected`);
    setSelectedLanguage(language);
  };

  const confirmSelection = () => {
    if (selectedLanguage !== 'English') {
      setShowModal(true);
    } else {
      console.log('English confirmed');
      setPage('Home');
    }
  };

  const closeModalAndGoHome = () => {
    setShowModal(false); // Close the modal
    setPage('Home'); // Redirect to Home immediately
    setTimeout(() => {
      setSelectedLanguage('English'); // Reset to English after 5 seconds
    }, 5000);
  };
  

  const languages = [
    { name: 'English', nativeName: '英语' },
    { name: 'Français', nativeName: 'Français' },
    { name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
    { name: 'Chinese', nativeName: '中文' },
    { name: 'Español', nativeName: 'Español' },
    { name: 'Arabic', nativeName: 'العربية' },
    { name: 'Urdu', nativeName: 'اردو' },
    { name: 'Hindi', nativeName: 'हिंदी' },
    { name: 'Vietnamese', nativeName: 'Tiếng Việt' },
    { name: 'German', nativeName: 'Deutsch' },
    { name: 'Italian', nativeName: 'Italiano' },
    { name: 'Korean', nativeName: '한국어' },
    { name: 'Russian', nativeName: 'Русский' },
    { name: 'Somali', nativeName: 'Soomaali' }
  ];

  return (
    <div className="language-selection-container">
      <div className="header">
        <span className="back-arrow" onClick={() => setPage('Home')}>&#8592;</span>
        <span className="title">Choose a Language</span>
      </div>
      <div className="languages-grid">
        {languages.map(language => (
          <button
            key={language.name}
            onClick={() => selectLanguage(language.name)}
            className={selectedLanguage === language.name ? 'selected-button' : ''}
          >
            {language.name} ({language.nativeName})
          </button>
        ))}
      </div>
      <div className="footer">
  <button className="cancel-button" onClick={() => setPage('Home')}>
    ✖ Cancel
  </button>
  <button className="confirm-button" onClick={confirmSelection}>
    ✔ Confirm
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

