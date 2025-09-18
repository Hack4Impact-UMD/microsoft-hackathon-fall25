import Button from "./Button";

type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
  onClick: () => void;
};

const ProgressBar = ({
  currentStep,
  totalSteps,
  onClick,
}: ProgressBarProps) => {
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center">
      {/* Next Step Button */}
      <div className="mt-4">
        {currentStep < totalSteps && (
          <Button label="Next Step" onClick={onClick} />
        )}
        {currentStep === totalSteps && <Button label="Finish" />}
      </div>
    </div>
  );
};

export default ProgressBar;
