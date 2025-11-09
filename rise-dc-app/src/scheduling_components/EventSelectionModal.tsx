import React, { useState } from "react";
import "./EventSelectionModal.css";
import ModalHeader from "./ModalHeader";
import SelectEventStep from "./SelectEventStep";
import CreateTaskNameStep from "./CreateTaskNameStep";
import AddSteps from "./AddSteps";
import TimeSelectionModal from "./TimeSelectionModal";
import QuietHobbyParticipant from "../scheduling_components/pages/QuietHobbiesParticipant"; // Add this import

interface EventSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventCreated: (event: {
    name: string;
    startTime: TimeSlot;
    endTime: TimeSlot;
    steps?: Step[];
  }) => void;
  initialStep?: ModalStep;
}

type Step = {
  id: number;
  text: string;
};

type TimeSlot = {
  hour: number;
  minute: number;
  period: "AM" | "PM";
};

type ModalStep =
  | "SELECT_EVENT"
  | "CREATE_TASK_NAME"
  | "SET_TIME"
  | "ADD_STEPS"
  | "QUIET_HOBBY";

const EventSelectionModal: React.FC<EventSelectionModalProps> = ({
  isOpen,
  onClose,
  onEventCreated,
  initialStep,
}) => {
  const [currentStep, setCurrentStep] = useState<ModalStep>(
    initialStep || "SELECT_EVENT",
  );
  const [taskName, setTaskName] = useState("");
  const [steps, setSteps] = useState<Step[]>([]);
  const [startTime, setStartTime] = useState<TimeSlot>({
    hour: 10,
    minute: 15,
    period: "AM",
  });
  const [endTime, setEndTime] = useState<TimeSlot>({
    hour: 11,
    minute: 15,
    period: "AM",
  });

  // New functionality from the other person
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);

  const handleEventClick = (eventName: string) => {
    // Special handling for Quiet Hobby
    if (eventName === "Quiet Hobby") {
      setCurrentStep("QUIET_HOBBY");
      return;
    }

    // Toggle the selection: if the same event is clicked again, unselect it.
    if (selectedEvent === eventName) {
      setSelectedEvent(null);
    } else {
      setSelectedEvent(eventName);
    }
  };

  const handleAddTimeClick = () => {
    if (selectedEvent || taskName) {
      setIsTimeModalOpen(true);
    }
  };

  const closeTimeModal = () => {
    setIsTimeModalOpen(false);
  };

  const handleTimeConfirmed = (
    newStartTime: TimeSlot,
    newEndTime: TimeSlot,
  ) => {
    setStartTime(newStartTime);
    setEndTime(newEndTime);
    setIsTimeModalOpen(false);
    onEventCreated({
      name: selectedEvent || taskName,
      startTime: newStartTime,
      endTime: newEndTime,
    });

    // Create the task with the selected event and times
    console.log("Task created:", {
      name: selectedEvent,
      startTime: newStartTime,
      endTime: newEndTime,
    });

    // Reset and close the main modal
    setSelectedEvent(null);
    onClose();
  };

  const handleQuietHobbyBack = () => {
    setCurrentStep("SELECT_EVENT");
  };

  const handleQuietHobbyActivityChosen = (activity: any) => {
    console.log("Quiet hobby chosen:", activity);
    setSelectedEvent(activity.name || "Quiet Hobby");
    setIsTimeModalOpen(true);
  };

  if (!isOpen) {
    return null;
  }

  const handleCustomTaskClick = () => {
    setCurrentStep("CREATE_TASK_NAME");
  };

  const handleBackToSelectEvent = () => {
    setCurrentStep("SELECT_EVENT");
  };

  const handleTaskNameNext = () => {
    setCurrentStep("ADD_STEPS");
    setCurrentStep("SET_TIME");
    setIsTimeModalOpen(true);
  };

  const handleBackToTaskName = () => {
    setCurrentStep("CREATE_TASK_NAME");
  };

  const handleStepsNext = () => {
    // Finish the task creation process
    handleFinish();
  };

  const handleFinish = () => {
    const newEvent = {
      name: taskName,
      steps,
      startTime,
      endTime,
    };

    onEventCreated(newEvent);

    // Here you would typically save the task data
    console.log("Task created:", {
      name: taskName,
      steps: steps,
      startTime: startTime,
      endTime: endTime,
    });

    // Reset state and close modal
    setCurrentStep("SELECT_EVENT");
    setTaskName("");
    setSteps([]);
    setStartTime({ hour: 10, minute: 15, period: "AM" });
    setEndTime({ hour: 11, minute: 15, period: "AM" });
    onClose();
  };

  const handleClose = () => {
    // Reset state when closing
    setCurrentStep("SELECT_EVENT");
    setTaskName("");
    setSteps([]);
    setStartTime({ hour: 10, minute: 15, period: "AM" });
    setEndTime({ hour: 11, minute: 15, period: "AM" });
    setSelectedEvent(null);
    onClose();
  };

  return (
    <>
      <div className="modal-overlay">
        {currentStep === "SELECT_EVENT" && (
          <div className="modal-content">
            <ModalHeader
              onClose={handleClose}
              title="Select Event"
              iconType="edit"
            />
            <div className="event-cards-container">
              {/* Make Bed Card */}
              <div
                className={`event-card ${selectedEvent === "Make Bed" ? "selected" : ""}`}
                onClick={() => handleEventClick("Make Bed")}
              >
                <div className="event-image-placeholder make-bed-color">
                  <span className="event-icon">🛏️</span>
                </div>
                <p className="event-name">Make Bed</p>
                {selectedEvent === "Make Bed" && (
                  <span className="selection-checkmark">✔️</span>
                )}
              </div>

              {/* Sweep Floor Card */}
              <div
                className={`event-card ${selectedEvent === "Sweep floor" ? "selected" : ""}`}
                onClick={() => handleEventClick("Sweep floor")}
              >
                <div className="event-image-placeholder sweep-floor-color">
                  <span className="event-icon">🧹</span>
                </div>
                <p className="event-name">Sweep floor</p>
                {selectedEvent === "Sweep floor" && (
                  <span className="selection-checkmark">✔️</span>
                )}
              </div>

              {/* Water plants Card */}
              <div
                className={`event-card ${selectedEvent === "Water plants" ? "selected" : ""}`}
                onClick={() => handleEventClick("Water plants")}
              >
                <div className="event-image-placeholder water-plants-color">
                  <span className="event-icon">💧</span>
                </div>
                <p className="event-name">Water plants</p>
                {selectedEvent === "Water plants" && (
                  <span className="selection-checkmark">✔️</span>
                )}
              </div>

              {/* Quiet Hobby Card */}
              <div
                className="event-card"
                onClick={() => handleEventClick("Quiet Hobby")}
              >
                <div className="event-image-placeholder quiet-hobby-color">
                  <span className="event-icon">🎨</span>
                </div>
                <p className="event-name">Quiet Hobby</p>
              </div>
            </div>
            <div className="or-separator">OR</div>
            <button
              className="custom-task-button"
              onClick={handleCustomTaskClick}
            >
              <span className="plus-icon">+</span> Custom Task
            </button>
            <button
              className={`add-time-button ${selectedEvent ? "enabled" : ""}`}
              disabled={!selectedEvent}
              onClick={handleAddTimeClick}
            >
              Add Time
            </button>
          </div>
        )}

        {currentStep === "CREATE_TASK_NAME" && (
          <CreateTaskNameStep
            onBack={handleBackToSelectEvent}
            onNext={handleTaskNameNext}
            onClose={handleClose}
            taskName={taskName}
            onTaskNameChange={setTaskName}
          />
        )}

        {currentStep === "ADD_STEPS" && (
          <AddSteps
            onBack={handleBackToTaskName}
            onNext={handleStepsNext}
            onClose={handleClose}
            taskName={taskName}
            steps={steps}
            onStepsChange={setSteps}
          />
        )}

        {currentStep === "QUIET_HOBBY" && (
          <QuietHobbyParticipant
            onBack={handleBackToSelectEvent}
            onActivityChosen={handleQuietHobbyActivityChosen}
            onPhotoTaken={() => console.log("Photo taken")}
            onClose={handleClose}
          />
        )}
      </div>

      {/* Time Selection Modal */}
      <TimeSelectionModal
        isOpen={isTimeModalOpen}
        onClose={closeTimeModal}
        selectedEvent={selectedEvent || taskName}
        onTimeConfirmed={handleTimeConfirmed}
      />
    </>
  );
};

export default EventSelectionModal;
