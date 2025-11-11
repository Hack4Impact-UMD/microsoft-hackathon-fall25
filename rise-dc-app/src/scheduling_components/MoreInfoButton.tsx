import { useState } from "react";
import { Instruction } from "../../shared/types";
import InfoIcon from "@mui/icons-material/Info";
import AddStepsMoreInfo from "./AddStepsMoreInfo";

interface MoreInfoButtonProps {
  info?: Instruction[];
  title: string;
  selectedIcon?: { name: string; icon: React.ComponentType<any> } | null;
  onIconChange?: (
    icon: { name: string; icon: React.ComponentType<any> } | null,
  ) => void;
}

interface Step {
  id: number;
  text: string;
}

export default function MoreInfoButton({
  info,
  title,
  selectedIcon,
  onIconChange,
}: MoreInfoButtonProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);

  const handleBack = () => {
    setModalIsOpen(false);
  };

  const handleNext = () => {
    console.log("Steps completed:", steps);
    setModalIsOpen(false);
  };

  const handleClose = () => {
    setModalIsOpen(false);
  };

  const handleStepsChange = (newSteps: Step[]) => {
    setSteps(newSteps);
  };

  return (
    <>
      <InfoIcon
        onClick={() => setModalIsOpen(true)}
        style={{ cursor: "pointer" }}
      >
        More Info
      </InfoIcon>
      {modalIsOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-[9999]">
          <AddStepsMoreInfo
            onBack={handleBack}
            onNext={handleNext}
            onClose={handleClose}
            taskName={title}
            steps={steps}
            onStepsChange={handleStepsChange}
            selectedIcon={selectedIcon}
            onIconChange={onIconChange}
          />
        </div>
      )}
    </>
  );
}
