import React, { useState } from 'react';
import ModalHeader from './ModalHeader';

interface Step {
  id: number;
  text: string;
}

interface AddStepsProps {
  onBack: () => void;
  onNext: () => void;
  onClose: () => void;
  taskName: string;
  steps: Step[];
  onStepsChange: (steps: Step[]) => void;
}

const AddSteps: React.FC<AddStepsProps> = ({
  onBack, 
  onNext, 
  onClose, 
  taskName,
  steps,
  onStepsChange
}) => {
  const [newStepText, setNewStepText] = useState('');

  const addStep = () => {
    if (newStepText.trim()) {
      const newStep: Step = {
        id: steps.length + 1,
        text: newStepText.trim()
      };
      const updatedSteps = [...steps, newStep];
      onStepsChange(updatedSteps);
      setNewStepText('');
    }
  };

  const removeStep = (stepId: number) => {
    const updatedSteps = steps.filter(step => step.id !== stepId);
    // Renumber the remaining steps
    const renumberedSteps = updatedSteps.map((step, index) => ({
      ...step,
      id: index + 1
    }));
    onStepsChange(renumberedSteps);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addStep();
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
      <ModalHeader 
        onBack={onBack}
        onClose={onClose}
        title="Creating custom task"
        iconType="edit"
      />
      
      <div className="mb-6 text-center">
        <div className="w-20 h-20 bg-orange-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
          <span className="text-white text-2xl">✏️</span>
        </div>
        <h4 className="text-lg font-medium text-gray-800">{taskName}</h4>
      </div>

      <div className="space-y-3 mb-6">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center space-x-3 p-3 bg-orange-100 rounded-lg">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
              {step.id}
            </div>
            <div className="flex-1 text-gray-800">{step.text}</div>
            <button 
              className="text-gray-400 hover:text-gray-600 p-1"
              onClick={() => removeStep(step.id)}
            >
              ≡
            </button>
          </div>
        ))}
        
        <div className="flex items-center space-x-3 p-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-medium text-sm">
            {steps.length + 1}
          </div>
          <input
            type="text"
            className="flex-1 border-none outline-none text-gray-800 placeholder-gray-400"
            placeholder="Add a step..."
            value={newStepText}
            onChange={(e) => setNewStepText(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>

      <button 
        className="w-full bg-orange-500 text-white py-3 rounded-full font-medium mb-3 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={addStep} 
        disabled={!newStepText.trim()}
      >
        <span className="mr-2">+</span> Add Goal
      </button>

      <button 
        className="w-full bg-blue-500 text-white py-3 rounded-full font-medium hover:bg-blue-600"
      >
        Add Time
      </button>
    </div>
  );
};

export default AddSteps;
