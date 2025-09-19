import { useState } from "react";
import ProgressBar from "../cookbook_components/ProgressBar";
import styles from "./Page.module.css";
import RecipeCreationProgressBar from "../cookbook_components/RecipeCreationProgressBar";

export default function Cookbook() {
  const totalSteps = 5;

  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  return (
    <div className={styles.container}>
      <h1>Adaptive Digital Cookbook</h1>
      <p>Digital cookbook for users with cognitive and literacy challenges</p>
      <ProgressBar
        currentStep={currentStep}
        totalSteps={totalSteps}
        onNext={handleNext}
      />

      <RecipeCreationProgressBar currentStep={currentStep} />
    </div>
  );
}
