import React from 'react';
import ModalHeader from './ModalHeader';

interface SelectEventStepProps {
  onCustomTaskClick: () => void;
  onClose: () => void;
}

const SelectEventStep: React.FC<SelectEventStepProps> = ({ onCustomTaskClick, onClose }) => {
  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
      <ModalHeader 
        onClose={onClose}
        title="Select Event"
        iconType="edit"
      />
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center cursor-pointer hover:opacity-80">
          <div className="w-20 h-20 bg-pink-400 rounded-full mx-auto mb-2"></div>
          <p className="text-sm font-medium text-gray-800">Make Bed</p>
        </div>
        <div className="text-center cursor-pointer hover:opacity-80">
          <div className="w-20 h-20 bg-orange-400 rounded-full mx-auto mb-2"></div>
          <p className="text-sm font-medium text-gray-800">Sweep</p>
        </div>
      </div>
      <div className="text-center text-gray-400 font-medium mb-4">OR</div>
      <button 
        className="w-full border-2 border-orange-400 text-orange-500 py-3 rounded-lg font-medium mb-3 hover:bg-orange-50 transition-colors"
        onClick={onCustomTaskClick}
      >
        <span className="mr-2">+</span> Custom Task
      </button>
      <button className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-medium cursor-not-allowed">
        Add Time
      </button>
    </div>
  );
};

export default SelectEventStep;
