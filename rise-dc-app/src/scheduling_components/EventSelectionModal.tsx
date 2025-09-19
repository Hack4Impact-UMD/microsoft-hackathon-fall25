import React, { useState } from 'react';
import './EventSelectionModal.css';

// Placeholder for the new time selection modal
const TimeSelectionModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="modal-title">Select Time</h3>
        <p>This is where the time selection UI will go.</p>
        <button onClick={onClose}>Close Time Modal</button>
      </div>
    </div>
  );
};

interface EventSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EventSelectionModal: React.FC<EventSelectionModalProps> = ({ isOpen, onClose }) => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);

  const handleEventClick = (eventName: string) => {
    // Toggle the selection: if the same event is clicked again, unselect it.
    if (selectedEvent === eventName) {
      setSelectedEvent(null);
    } else {
      setSelectedEvent(eventName);
    }
  };

  const handleAddTimeClick = () => {
    if (selectedEvent) {
      setIsTimeModalOpen(true);
    }
  };

  const closeTimeModal = () => {
    setIsTimeModalOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <span className="edit-icon">✏️</span>
            <h3 className="modal-title">Select Event</h3>
            <button className="close-button" onClick={onClose}>❌</button>
          </div>
          <div className="event-cards-container">
            {/* Make Bed Card */}
            <div
              className={`event-card ${selectedEvent === 'Make Bed' ? 'selected' : ''}`}
              onClick={() => handleEventClick('Make Bed')}
            >
              <div className="event-image-placeholder make-bed-color">
                <span className="event-icon">🛏️</span>
              </div>
              <p className="event-name">Make Bed</p>
              {selectedEvent === 'Make Bed' && (
                <span className="selection-checkmark">✔️</span>
              )}
            </div>

            {/* Sweep Floor Card */}
            <div
              className={`event-card ${selectedEvent === 'Sweep floor' ? 'selected' : ''}`}
              onClick={() => handleEventClick('Sweep floor')}
            >
              <div className="event-image-placeholder sweep-floor-color">
                <span className="event-icon">🧹</span>
              </div>
              <p className="event-name">Sweep floor</p>
              {selectedEvent === 'Sweep floor' && (
                <span className="selection-checkmark">✔️</span>
              )}
            </div>
            
            {/* Water plants Card */}
            <div
              className={`event-card ${selectedEvent === 'Water plants' ? 'selected' : ''}`}
              onClick={() => handleEventClick('Water plants')}
            >
              <div className="event-image-placeholder water-plants-color">
                <span className="event-icon">💧</span>
              </div>
              <p className="event-name">Water plants</p>
              {selectedEvent === 'Water plants' && (
                <span className="selection-checkmark">✔️</span>
              )}
            </div>
          </div>
          <div className="or-separator">OR</div>
          <button className="custom-task-button">
            <span className="plus-icon">+</span> Custom Task
          </button>
          <button
            className={`add-time-button ${selectedEvent ? 'enabled' : ''}`}
            disabled={!selectedEvent}
            onClick={handleAddTimeClick}
          >
            Add Time
          </button>
        </div>
      </div>
      <TimeSelectionModal isOpen={isTimeModalOpen} onClose={closeTimeModal} />
    </>
  );
};

export default EventSelectionModal;
