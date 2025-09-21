import React, { useState } from 'react';
import './EventSelectionModal.css';

interface TimeSlot {
  hour: number;
  minute: number;
  period: 'AM' | 'PM';
}

interface TimeSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEvent?: string;
  onTimeConfirmed?: (startTime: TimeSlot, endTime: TimeSlot) => void;
}

type TimeSelectionStep = 'START_TIME' | 'END_TIME' | 'COMPLETE';

const TimeSelectionModal: React.FC<TimeSelectionModalProps> = ({ 
  isOpen, 
  onClose, 
  selectedEvent = 'Sweep floor',
  onTimeConfirmed 
}) => {
  const [currentStep, setCurrentStep] = useState<TimeSelectionStep>('START_TIME');
  const [startTime, setStartTime] = useState<TimeSlot>({ hour: 10, minute: 0, period: 'AM' });
  const [endTime, setEndTime] = useState<TimeSlot>({ hour: 11, minute: 0, period: 'AM' });

  if (!isOpen) return null;

  const updateTime = (
    timeType: 'start' | 'end',
    field: 'hour' | 'minute' | 'period',
    increment: boolean
  ) => {
    const currentTime = timeType === 'start' ? startTime : endTime;
    const setTime = timeType === 'start' ? setStartTime : setEndTime;

    if (field === 'hour') {
      let newHour = increment ? currentTime.hour + 1 : currentTime.hour - 1;
      if (newHour > 12) newHour = 1;
      if (newHour < 1) newHour = 12;
      setTime({ ...currentTime, hour: newHour });
    } else if (field === 'minute') {
      let newMinute = increment ? currentTime.minute + 15 : currentTime.minute - 15;
      if (newMinute >= 60) newMinute = 0;
      if (newMinute < 0) newMinute = 45;
      setTime({ ...currentTime, minute: newMinute });
    }
  };

  const togglePeriod = (timeType: 'start' | 'end') => {
    const currentTime = timeType === 'start' ? startTime : endTime;
    const setTime = timeType === 'start' ? setStartTime : setEndTime;
    setTime({ ...currentTime, period: currentTime.period === 'AM' ? 'PM' : 'AM' });
  };

  const getEventIcon = (eventName: string) => {
    switch (eventName) {
      case 'Make Bed': return '🛏️';
      case 'Sweep floor': return '🧹';
      case 'Water plants': return '💧';
      default: return '📋';
    }
  };

  const getEventColor = (eventName: string) => {
    switch (eventName) {
      case 'Make Bed': return '#f77092';
      case 'Sweep floor': return '#ff9955';
      case 'Water plants': return '#5d9cec';
      default: return '#ddd';
    }
  };

  const handleOK = () => {
    if (currentStep === 'START_TIME') {
      setCurrentStep('END_TIME');
    } else if (currentStep === 'END_TIME') {
      setCurrentStep('COMPLETE');
    }
  };

  const handleBack = () => {
    if (currentStep === 'END_TIME') {
      setCurrentStep('START_TIME');
    } else if (currentStep === 'COMPLETE') {
      setCurrentStep('END_TIME');
    }
  };

  const handleFinish = () => {
    if (onTimeConfirmed) {
      onTimeConfirmed(startTime, endTime);
    }
    // Reset to initial state
    setCurrentStep('START_TIME');
    onClose();
  };

  const handleClose = () => {
    // Reset to initial state
    setCurrentStep('START_TIME');
    onClose();
  };

  const renderTimeSelector = (
    timeType: 'start' | 'end',
    time: TimeSlot,
    isActive: boolean,
    label: string,
    icon: string = '🕐'
  ) => (
    <div className={`time-selector ${isActive ? 'active' : 'disabled'} ${timeType}-time-selector`}>
      <p>{icon} {label}</p>
      
      <div className="period-toggle">
        <button 
          className={time.period === 'AM' ? 'active' : ''}
          onClick={() => isActive && togglePeriod(timeType)}
          disabled={!isActive}
        >
          AM
        </button>
        <button 
          className={time.period === 'PM' ? 'active' : ''}
          onClick={() => isActive && togglePeriod(timeType)}
          disabled={!isActive}
        >
          PM
        </button>
      </div>

      <div className="time-input">
        <div className="time-unit">
          {isActive && (
            <button 
              className="up-arrow"
              onClick={() => updateTime(timeType, 'hour', true)}
            />
          )}
          <span className={`number ${!isActive ? 'disabled-text' : ''}`}>
            {time.hour.toString().padStart(2, '0')}
          </span>
          {isActive && (
            <button 
              className="down-arrow"
              onClick={() => updateTime(timeType, 'hour', false)}
            />
          )}
        </div>
        
        <span style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold',
          color: isActive ? '#333' : '#ccc'
        }}>:</span>
        
        <div className="time-unit">
          {isActive && (
            <button 
              className="up-arrow"
              onClick={() => updateTime(timeType, 'minute', true)}
            />
          )}
          <span className={`number ${!isActive ? 'disabled-text' : ''}`}>
            {time.minute.toString().padStart(2, '0')}
          </span>
          {isActive && (
            <button 
              className="down-arrow"
              onClick={() => updateTime(timeType, 'minute', false)}
            />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content time-selection-modal">
        {/* Header */}
        <div className="modal-header">
          {currentStep !== 'START_TIME' && (
            <button className="back-button" onClick={handleBack}>
              🔙
            </button>
          )}
          {currentStep === 'START_TIME' && (
            <button className="back-button" onClick={handleClose}>
              🔙
            </button>
          )}
          <div className="header-text">
            <span className="clock-icon">🕐</span>
            <h3>Select time</h3>
          </div>
          <button className="close-button" onClick={handleClose}>
            ✕
          </button>
        </div>

        {/* Event Info */}
        <div className="event-info">
          <div 
            className="event-image-placeholder" 
            style={{ backgroundColor: getEventColor(selectedEvent) }}
          >
            <span className="event-icon">{getEventIcon(selectedEvent)}</span>
          </div>
          <p className="event-name">{selectedEvent}</p>
        </div>

        {/* Time Selectors */}
        <div className="time-selectors-container">
          {renderTimeSelector(
            'start', 
            startTime, 
            currentStep === 'START_TIME', 
            'Start time'
          )}
          
          {renderTimeSelector(
            'end', 
            endTime, 
            currentStep === 'END_TIME', 
            'End time'
          )}
        </div>

        {/* Action Buttons */}
        <div className="modal-actions">
          {currentStep === 'COMPLETE' ? (
            <button className="finish-adding-task-button" onClick={handleFinish}>
              Finish Adding Task
            </button>
          ) : (
            <>
              <button className="ok-button" onClick={handleOK}>
                OK
              </button>
              <button className="finish-button" onClick={handleFinish}>
                Finish
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeSelectionModal;