// Modal.js
import React from 'react';
import './Modal.css'; 

const Modal = ({ showModal, setShowModal, message, onConfirm }) => {
  if (!showModal) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={() => {
          onConfirm();
          setShowModal(false);
        }}>
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;
