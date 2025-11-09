import { useState, useEffect } from "react";
import CustomTaskStep from "./CustomTaskStep";
import AddStepsStep from "./AddSteps";
import ConfirmationModal from "./ConfirmationModal";

type TaskCreationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (taskName: string, taskSteps: string[]) => void;
};

export default function TaskCreationModal({
  isOpen,
  onClose,
  onAddTask,
}: TaskCreationModalProps) {
  const [step, setStep] = useState(1);
  const [taskName, setTaskName] = useState("");
  const [steps, setSteps] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Resets task creation content in modal on every new open
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setTaskName("");
      setSteps([]);
      setShowConfirmation(false);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleCreate = () => {
    setStep(2);
  };

  const handleDone = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    onAddTask(taskName, steps);
    onClose();
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        {step === 1 && (
          <CustomTaskStep
            taskName={taskName}
            setTaskName={setTaskName}
            onCreate={handleCreate}
            onModalClose={onClose}
          />
        )}
        {step === 2 && (
          <AddStepsStep
            steps={steps}
            setSteps={setSteps}
            onDone={handleDone}
            taskName={taskName}
            onModalClose={onClose}
          />
        )}
      </div>
      <ConfirmationModal
        isOpen={showConfirmation}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title="Are you ready to publish"
        itemName={taskName}
      />
    </div>
  );
}
