import Button from "./Button";

type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
};

const ProgressBar = ({ currentStep, totalSteps, onNext }: ProgressBarProps) => {
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center">
      <p className="text-lg font-semibold mb-2">
        Step {currentStep}/{totalSteps}
      </p>

      <div className="w-full h-4 bg-[#E6E6E6] rounded-full flex border-1 border-[#616161] overflow-hidden">        
      {Array.from({ length: totalSteps }).map((_, index) => {
          const isComplete = index + 1 <= currentStep;

          return (
            <div
              key={index + 1}
              className={`
                h-full flex-1 transition-colors duration-300 rounded ml-[-8px]
                ${isComplete ? "bg-[#0F6CBD]" : "bg-[#E6E6E6]"}
                ${!isComplete && index >= 0 ? "border-r-1 border-[#616161]" : ""}
                ${index > 0 ? "ml-[-2px]" : ""}
              `}
              style={{ zIndex: totalSteps - index, position: "relative" }}
            />
          );
        })}
      </div>

      {/* Next Step Button */}
      <div className="mt-6">
        {currentStep < totalSteps ? (
          <Button label="Next Step" onClick={onNext} />
        ) : (
          <Button label="Done" />
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
