import { useMemo, useState } from "react";
import TaskBody from "./TaskBody";
import QuietHobbiesStaff from "./QuietHobbiesStaff";

export default function CreateEvent() {
  const [activeTab, setActiveTab] = useState<"task" | "choice">("task");

  // Task state
  const [taskTitle, setTaskTitle] = useState("");
  const [taskSteps, setTaskSteps] = useState<string[]>([""]);
  const [taskValid, setTaskValid] = useState(false);

  // Choice state (we embed QuietHobbiesStaff unchanged; validity not enforced)
  const choiceValid = false; // Per mock, Finish appears disabled on Choice tab

  const isValid = useMemo(() => {
    return activeTab === "task" ? taskValid : choiceValid;
  }, [activeTab, taskValid, choiceValid]);

  const handleFinish = () => {
    if (!isValid) return;
    // UI-only demo: console log payload
    if (activeTab === "task") {
      console.log("CreateEvent Submit (Task):", {
        title: taskTitle.trim(),
        steps: taskSteps.map((s) => s.trim()).filter(Boolean),
      });
      alert("Task saved (UI-only).");
    }
  };

  return (
    <div className="relative bg-[#0A2A33] min-h-screen w-full flex items-start justify-center">
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="-ml-[1px]">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h2 className="text-center text-[22px] font-semibold text-[#0B3A3F]">Create Event</h2>
          <button
            type="button"
            aria-label="Close"
            className="absolute right-6 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#FFD2E4] text-[#FF2680] grid place-items-center"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        {/* Tabs */}
        <div className="px-6 pt-1">
          <div className="w-[220px] mx-auto bg-[#EDEDED] rounded-full p-1 flex">
            <button
              type="button"
              onClick={() => setActiveTab("task")}
              aria-current={activeTab === "task" ? "page" : undefined}
              className={`flex-1 px-4 py-2 rounded-full font-medium shadow-[inset_0_-1px_0_rgba(0,0,0,0.06)] ${
                activeTab === "task" ? "bg-[#FD8743] text-white" : "text-[#A2A2A2]"
              }`}
            >
              Task
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("choice")}
              aria-current={activeTab === "choice" ? "page" : undefined}
              className={`flex-1 px-4 py-2 rounded-full font-medium ${
                activeTab === "choice" ? "bg-[#FD8743] text-white" : "text-[#A2A2A2]"
              }`}
            >
              Choice
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-0">
          {activeTab === "task" ? (
            <TaskBody
              title={taskTitle}
              steps={taskSteps}
              onTitleChange={setTaskTitle}
              onStepsChange={setTaskSteps}
              onValidityChange={setTaskValid}
            />
          ) : (
            // Render the existing staff page unchanged as requested
            <div className="px-0 py-0">
              <QuietHobbiesStaff embedded />
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="px-6 pb-8 grid place-items-center">
          <button
            type="button"
            onClick={handleFinish}
            disabled={!isValid}
            className={`w-[360px] h-12 rounded-xl font-semibold shadow-sm ${
              isValid ? "bg-[#2DA75A] text-white hover:brightness-95" : "bg-[#E3E3E3] text-[#B5B5B5] cursor-not-allowed"
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
