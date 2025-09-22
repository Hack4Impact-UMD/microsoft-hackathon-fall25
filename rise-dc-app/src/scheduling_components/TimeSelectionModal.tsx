import React, { useState } from "react";
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
    field: 'hour' | 'minute',
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
      let newMinute = increment ? currentTime.minute + 1 : currentTime.minute - 1;
      if (newMinute >= 60) newMinute = 0;
      if (newMinute < 0) newMinute = 59;
      setTime({ ...currentTime, minute: newMinute });
    }
  };

  const updateTimeDirect = (
    timeType: 'start' | 'end',
    field: 'hour' | 'minute',
    value: number
  ) => {
    const setTime = timeType === 'start' ? setStartTime : setEndTime;
    const currentTime = timeType === 'start' ? startTime : endTime;

    if (field === 'hour') {
      if (value < 1) value = 1;
      if (value > 12) value = 12;
    } else if (field === 'minute') {
      if (value < 0) value = 0;
      if (value > 59) value = 59;
    }

    setTime({ ...currentTime, [field]: value });
  };

  const togglePeriod = (timeType: 'start' | 'end') => {
    const currentTime = timeType === 'start' ? startTime : endTime;
    const setTime = timeType === 'start' ? setStartTime : setEndTime;
    setTime({ ...currentTime, period: currentTime.period === 'AM' ? 'PM' : 'AM' });
  };

  const handleOK = () => {
    if (currentStep === 'START_TIME') setCurrentStep('END_TIME');
    else if (currentStep === 'END_TIME') setCurrentStep('COMPLETE');
  };

  const handleBack = () => {
    if (currentStep === 'END_TIME') setCurrentStep('START_TIME');
    else if (currentStep === 'COMPLETE') setCurrentStep('END_TIME');
  };

  const handleFinish = () => {
    onTimeConfirmed?.(startTime, endTime);
    setCurrentStep('START_TIME');
    onClose();
  };

  const handleClose = () => {
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
          <button className="up-arrow" onClick={() => isActive && updateTime(timeType, 'hour', true)} />
          <input
          className="time-text-input"
            type="number"
            min={1}
            max={12}
            value={time.hour}
            disabled={!isActive}
            onChange={(e) => isActive && updateTimeDirect(timeType, 'hour', Number(e.target.value))}
          />
          <button className="down-arrow" onClick={() => isActive && updateTime(timeType, 'hour', false)} />
        </div>
        
        <span>:</span>
        
        <div className="time-unit">
          <button className="up-arrow" onClick={() => isActive && updateTime(timeType, 'minute', true)} />
          <input
            className="time-text-input"
            type="number"
            min={0}
            max={59}
            value={time.minute.toString().padStart(2, '0').toString().padStart(2, '0')}
            disabled={!isActive}
            onChange={(e) => isActive && updateTimeDirect(timeType, 'minute', Number(e.target.value))}
          />
          <button className="down-arrow" onClick={() => isActive && updateTime(timeType, 'minute', false)} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content time-selection-modal">
        {/* Header */}
        <div className="modal-header">
          {currentStep !== 'START_TIME' && <button className="back-button" onClick={handleBack}>🔙</button>}
          {currentStep === 'START_TIME' && <button className="back-button" onClick={handleClose}>🔙</button>}
          <div className="header-text"><span className="clock-icon">🕐</span><h3>Select time</h3></div>
          <button className="close-button" onClick={handleClose}>✕</button>
        </div>

        {/* Event Info */}
        <div className="event-info">
          <div className="event-image-placeholder" style={{ backgroundColor: '#ff9955' }}>
            <span className="event-icon">🧹</span>
          </div>
          <p className="event-name">{selectedEvent}</p>
        </div>

        {/* Time Selectors */}
        <div className="time-selectors-container">
          {renderTimeSelector('start', startTime, currentStep === 'START_TIME', 'Start time')}
          {renderTimeSelector('end', endTime, currentStep === 'END_TIME', 'End time')}
        </div>

        {/* Action Buttons */}
        <div className="modal-actions">
          {currentStep === 'COMPLETE' ? (
            <button className="finish-adding-task-button" onClick={handleFinish}>Finish Adding Task</button>
          ) : (
            <>
              <button className="ok-button" onClick={handleOK}>OK</button>
              <button className="finish-button" onClick={handleFinish}>Finish</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeSelectionModal;