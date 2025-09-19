import React from 'react';
import './EventSelectionModal.css';

interface EventSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EventSelectionModal: React.FC<EventSelectionModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <span className="edit-icon">✏️</span>
          <h3 className="modal-title">Select Event</h3>
          <button className="close-button" onClick={onClose}>❌</button>
        </div>
        <div className="event-cards-container">
          <div className="event-card">
            <div className="event-image-placeholder"></div>
            <p className="event-name">Make Bed</p>
          </div>
          <div className="event-card">
            <div className="event-image-placeholder"></div>
            <p className="event-name">Sweep floor</p>
          </div>
          <div className="event-card">
            <div className="event-image-placeholder"></div>
            <p className="event-name">Water plants</p>
          </div>
        </div>
        <div className="or-separator">OR</div>
        <button className="custom-task-button">
          <span className="plus-icon">+</span> Custom Task
        </button>
        <button className="add-time-button">Add Time</button>
      </div>
    </div>
  );
};

export default EventSelectionModal;
