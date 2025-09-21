import { useEffect, useMemo, useState } from "react";

export interface TaskBodyProps {
  title: string;
  steps: string[];
  onTitleChange: (next: string) => void;
  onStepsChange: (next: string[]) => void;
  onValidityChange?: (valid: boolean) => void;
}

function StepRow({ index, value, onChange }: { index: number; value: string; onChange: (next: string) => void }) {
  return (
    <div
      className="flex items-center w-full rounded-lg border border-[#FD8743] px-3 py-2 shadow-sm"
      role="group"
      aria-label={`Step ${index + 1}`}
    >
      <div className="flex items-center justify-center w-6 h-6 mr-3 rounded-full bg-[#FD8743] text-white text-sm font-semibold">
        {index + 1}
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 min-w-0 bg-transparent outline-none px-1 py-1"
        placeholder="Enter a step..."
        aria-label={`Step ${index + 1} input`}
      />
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className="text-[#FD8743] ml-2"
      >
        <path d="M7 9h10M7 12h10M7 15h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function TaskBody({ title, steps, onTitleChange, onStepsChange, onValidityChange }: TaskBodyProps) {
  const [localTitle, setLocalTitle] = useState(title);
  const [localSteps, setLocalSteps] = useState<string[]>(steps.length ? steps : [""]);

  useEffect(() => setLocalTitle(title), [title]);
  useEffect(() => setLocalSteps(steps.length ? steps : [""]), [steps]);

  const isValid = useMemo(() => {
    const hasTitle = localTitle.trim().length > 0;
    const hasAtLeastOneStep = localSteps.some((s) => s.trim().length > 0);
    return hasTitle && hasAtLeastOneStep;
  }, [localTitle, localSteps]);

  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

  const updateStep = (idx: number, next: string) => {
    setLocalSteps((prev) => {
      const copy = [...prev];
      copy[idx] = next;
      onStepsChange(copy);
      return copy;
    });
  };

  const addStep = () => {
    setLocalSteps((prev) => {
      const copy = [...prev, ""];
      onStepsChange(copy);
      return copy;
    });
  };

  return (
    <div className="mx-6 my-5 p-0 rounded-2xl border border-[#E6E6E6] shadow-[0_2px_6px_rgba(0,0,0,0.06)] overflow-hidden">
      {/* Gray image area */}
      <div className="h-48 bg-[#EDEDED] grid place-items-center">
        <div
          className="w-28 h-28 rounded-full border-2 border-[#2E9BFF]"
          style={{
            backgroundImage:
              'linear-gradient(45deg, #f6f6f6 25%, transparent 25%), linear-gradient(-45deg, #f6f6f6 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f6f6f6 75%), linear-gradient(-45deg, transparent 75%, #f6f6f6 75%)',
            backgroundSize: '14px 14px',
            backgroundPosition: '0 0, 0 7px, 7px -7px, -7px 0px',
          }}
        />
      </div>
      {/* Title */}
      <div className="py-4 border-t grid place-items-center">
        <div className="flex items-center gap-2">
          <input
            value={localTitle}
            onChange={(e) => {
              setLocalTitle(e.target.value);
              onTitleChange(e.target.value);
            }}
            placeholder="Water Plant"
            aria-label="Event name"
            className="text-[20px] text-center font-medium px-2 py-1 bg-transparent outline-none"
          />
          <span className="text-[#9A9A9A]" aria-hidden>
            ✎
          </span>
        </div>
      </div>
      {/* Steps */}
      <div className="px-6 pb-6">
        <div className="space-y-3" aria-label="Steps list">
          {localSteps.map((s, idx) => (
            <StepRow key={`step-${idx}`} index={idx} value={s} onChange={(next) => updateStep(idx, next)} />
          ))}
          <div className="pt-1">
            <button
              type="button"
              onClick={addStep}
              className="mx-auto block w-[240px] h-12 rounded-xl bg-[#E8631C] text-white font-semibold hover:brightness-95"
            >
              <span className="mr-2 text-xl">＋</span> Add Goal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
