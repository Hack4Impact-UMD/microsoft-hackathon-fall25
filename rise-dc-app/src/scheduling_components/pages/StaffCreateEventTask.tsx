import { useMemo, useState } from "react";

interface StepItem {
  id: string;
  text: string;
}

function uid() {
  return `step_${Math.random().toString(36).slice(2, 9)}`;
}

function StepRow({
  index,
  step,
  onChange,
}: {
  index: number;
  step: StepItem;
  onChange: (next: string) => void;
}) {
  return (
    <div
      className="flex items-center w-full rounded-lg border border-[#FD8743] px-3 py-2 shadow-sm"
      role="group"
      aria-label={`Step ${index + 1}`}
    >
      {/* Number badge */}
      <div className="flex items-center justify-center w-6 h-6 mr-3 rounded-full bg-[#FD8743] text-white text-sm font-semibold">
        {index + 1}
      </div>
      {/* Input */}
      <input
        value={step.text}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 min-w-0 bg-transparent outline-none px-1 py-1"
        placeholder="Enter a step..."
        aria-label={`Step ${index + 1} input`}
      />
      {/* Drag handle icon */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className="text-[#FD8743] ml-2"
      >
        <path
          d="M7 9h10M7 12h10M7 15h10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default function StaffCreateEventTask() {
  const [title, setTitle] = useState("");
  const [steps, setSteps] = useState<StepItem[]>([{ id: uid(), text: "" }]);

  const isValid = useMemo(() => {
    const hasTitle = title.trim().length > 0;
    const hasAtLeastOneStep = steps.some((s) => s.text.trim().length > 0);
    return hasTitle && hasAtLeastOneStep;
  }, [title, steps]);

  const addStep = () => setSteps((prev) => [...prev, { id: uid(), text: "" }]);

  const updateStep = (id: string, next: string) =>
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, text: next } : s)),
    );

  // Visual parity with mockup: rows are static; remove, move actions are not shown.

  const handleFinish = () => {
    // UI-only: no backend. This is where a POST would occur later.
    // Keeping console.log for developers during integration.
    console.log("Created Task (UI-only):", {
      name: title.trim(),
      steps: steps.map((s) => s.text.trim()).filter(Boolean),
    });
    alert("Task saved (UI-only). Integration to backend will be wired later.");
  };

  return (
    <div
      className="relative bg-[#0A2A33] min-h-screen w-full flex items-start justify-center"
      aria-label="Staff Create Event - Task"
    >
      {/* Fixed-size design surface following provided dimensions */}
      <section
        className="rounded-2xl shadow-[0_4px_10px_rgba(0,0,0,0.12)] bg-white overflow-hidden"
        style={{
          position: "absolute",
          top: 184,
          left: "50%",
          transform: "translateX(-50%)",
          width: 720,
          height: 1074,
          opacity: 1,
        }}
      >
        {/* Header */}
        <header className="relative px-6 py-5">
          <button
            type="button"
            aria-label="Go back"
            className="absolute left-6 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#FFD2E4] text-[#FF2680] grid place-items-center"
          >
            {/* Back arrow */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="-ml-[1px]"
            >
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h2 className="text-center text-[22px] font-semibold text-[#0B3A3F]">
            Create Event
          </h2>
          <button
            type="button"
            aria-label="Close"
            className="absolute right-6 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#FFD2E4] text-[#FF2680] grid place-items-center"
          >
            {/* Close icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6l-12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        {/* Tabs */}
        <div className="px-6 pt-1">
          <div className="w-[220px] mx-auto bg-[#EDEDED] rounded-full p-1 flex">
            <button
              type="button"
              aria-current="page"
              className="flex-1 px-4 py-2 rounded-full bg-[#FD8743] text-white font-medium shadow-[inset_0_-1px_0_rgba(0,0,0,0.06)]"
            >
              Task
            </button>
            <button
              type="button"
              aria-disabled
              disabled
              className="flex-1 px-4 py-2 rounded-full text-[#A2A2A2] cursor-not-allowed"
              title="Choice coming soon"
            >
              Choice
            </button>
          </div>
        </div>

        {/* Content card */}
        <div className="mx-6 my-5 p-0 rounded-2xl border border-[#E6E6E6] shadow-[0_2px_6px_rgba(0,0,0,0.06)] overflow-hidden">
          {/* Gray image area */}
          <div className="h-48 bg-[#EDEDED] grid place-items-center">
            <div
              className="w-28 h-28 rounded-full border-2 border-[#2E9BFF]"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, #f6f6f6 25%, transparent 25%), linear-gradient(-45deg, #f6f6f6 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f6f6f6 75%), linear-gradient(-45deg, transparent 75%, #f6f6f6 75%)",
                backgroundSize: "14px 14px",
                backgroundPosition: "0 0, 0 7px, 7px -7px, -7px 0px",
              }}
            />
          </div>
          {/* Title */}
          <div className="py-4 border-t grid place-items-center">
            <div className="flex items-center gap-2">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
              {steps.map((s, idx) => (
                <StepRow
                  key={s.id}
                  index={idx}
                  step={s}
                  onChange={(next) => updateStep(s.id, next)}
                />
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

        {/* Footer */}
        <footer className="px-6 pb-8 grid place-items-center">
          <button
            type="button"
            onClick={handleFinish}
            disabled={!isValid}
            className={`w-[360px] h-12 rounded-xl font-semibold shadow-sm ${
              isValid
                ? "bg-[#2DA75A] text-white hover:brightness-95"
                : "bg-[#E3E3E3] text-[#B5B5B5] cursor-not-allowed"
            }`}
            aria-disabled={!isValid}
          >
            Finish
          </button>
        </footer>
      </section>
    </div>
  );
}
