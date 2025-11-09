import { useState, useEffect } from "react";
import {
  QuietHobby,
  QuietHobbiesStaffProps,
  CreateQuietHobbyRequest,
} from "../quiet_hobbies/types";
import { quietHobbiesApi } from "../quiet_hobbies/api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = QuietHobbiesStaffProps & { embedded?: boolean };

export default function QuietHobbiesStaff({
  onHobbyCreated,
  onHobbyUpdated,
  onHobbyDeleted,
  embedded = false,
}: Props) {
  const [hobbies, setHobbies] = useState<QuietHobby[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newHobbyName, setNewHobbyName] = useState("");
  const [editingName, setEditingName] = useState("");
  // Local UI fields for title/description shown in mock
  const [choiceTitle, setChoiceTitle] = useState("Quiet Time");
  const [choiceDescription, setChoiceDescription] = useState("");

  useEffect(() => {
    loadHobbies();
  }, []);

  const loadHobbies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await quietHobbiesApi.getAll();
      setHobbies(data);
    } catch (err) {
      setError("Failed to load quiet hobbies");
      console.error("Error loading hobbies:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateHobby = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHobbyName.trim()) return;

    try {
      const request: CreateQuietHobbyRequest = {
        name: newHobbyName.trim(),
        // TODO: Add real icon
      };

      const newHobby = await quietHobbiesApi.create(request);
      setHobbies((prev) => [...prev, newHobby]);
      setNewHobbyName("");
      setIsCreating(false);
      onHobbyCreated?.(newHobby);
    } catch (err) {
      setError("Failed to create quiet hobby");
      console.error("Error creating hobby:", err);
    }
  };

  const handleUpdateHobby = async (id: string) => {
    if (!editingName.trim()) return;

    try {
      const updatedHobby = await quietHobbiesApi.update({
        id,
        name: editingName.trim(),
      });

      if (updatedHobby) {
        setHobbies((prev) =>
          prev.map((hobby) => (hobby.id === id ? updatedHobby : hobby)),
        );
        setEditingId(null);
        setEditingName("");
        onHobbyUpdated?.(updatedHobby);
      }
    } catch (err) {
      setError("Failed to update quiet hobby");
      console.error("Error updating hobby:", err);
    }
  };

  const handleDeleteHobby = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quiet hobby?")) return;

    try {
      const success = await quietHobbiesApi.delete(id);
      if (success) {
        setHobbies((prev) => prev.filter((hobby) => hobby.id !== id));
        onHobbyDeleted?.(id);
      }
    } catch (err) {
      setError("Failed to delete quiet hobby");
      console.error("Error deleting hobby:", err);
    }
  };

  const startEditing = (hobby: QuietHobby) => {
    setEditingId(hobby.id);
    setEditingName(hobby.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingName("");
  };

  const ListCard = (
    <div className="px-6 pb-6">
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm text-red-700 mb-2">{error}</p>
          <button
            onClick={loadHobbies}
            className="px-3 py-2 bg-red-600 text-white rounded-md text-sm"
          >
            Try Again
          </button>
        </div>
      )}

      <div className="mx-auto w-[380px] rounded-xl border border-[#E6E6E6] shadow-[0_2px_6px_rgba(0,0,0,0.06)] bg-white overflow-hidden">
        <div className="max-h-[260px] overflow-y-auto divide-y">
          {hobbies.map((hobby) => (
            <div
              key={hobby.id}
              className="flex items-center justify-between px-4 py-3 bg-white"
            >
              {editingId === hobby.id ? (
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="flex-1 mr-3 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  autoFocus
                />
              ) : (
                <span className="text-sm text-gray-800">{hobby.name}</span>
              )}
              <div className="flex items-center gap-2">
                {editingId === hobby.id ? (
                  <>
                    <button
                      onClick={() => handleUpdateHobby(hobby.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded-md text-xs"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="px-3 py-1 bg-gray-500 text-white rounded-md text-xs"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <EditIcon
                      className="cursor-pointer text-orange-600"
                      onClick={() => startEditing(hobby)}
                    />
                    <DeleteIcon
                      className="cursor-pointer text-orange-600"
                      onClick={() => handleDeleteHobby(hobby.id)}
                    />
                  </>
                )}
              </div>
            </div>
          ))}

          {/* Add Option row */}
          <div className="px-4 py-3 bg-white">
            {!isCreating ? (
              <button
                onClick={() => setIsCreating(true)}
                className="text-sm text-[#5B5B5B] hover:underline"
              >
                Add Option...
              </button>
            ) : (
              <form
                onSubmit={handleCreateHobby}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={newHobbyName}
                  onChange={(e) => setNewHobbyName(e.target.value)}
                  placeholder="Enter hobby name..."
                  className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!newHobbyName.trim()}
                  className="px-3 py-2 bg-green-600 text-white rounded-md text-xs disabled:opacity-50"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setNewHobbyName("");
                  }}
                  className="px-3 py-2 bg-gray-500 text-white rounded-md text-xs"
                >
                  Cancel
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const InnerChoiceLayout = (
    <div className="pt-3">
      {/* Small icon placeholder + centered title/description */}
      <div className="px-6">
        <div className="grid place-items-center mb-3">
          <div
            className="w-14 h-14 rounded-md border border-dashed border-[#CFCFCF] bg-[#F5F6F7] mb-2"
            aria-hidden
          />
          <div className="flex items-center gap-2">
            <input
              value={choiceTitle}
              onChange={(e) => setChoiceTitle(e.target.value)}
              placeholder="Quiet Time"
              aria-label="Choice title"
              className="text-[24px] font-bold text-center px-2 py-1 bg-transparent outline-none"
            />
            <span className="text-[#9A9A9A]" aria-hidden>
              ✎
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 text-[#9A9A9A] mb-6">
          <input
            value={choiceDescription}
            onChange={(e) => setChoiceDescription(e.target.value)}
            placeholder="Enter a choice description."
            aria-label="Choice description"
            className="text-center px-2 py-1 bg-transparent outline-none text-[16px] font-medium"
          />
          <span className="text-[#9A9A9A]" aria-hidden>
            ✎
          </span>
        </div>
      </div>

      {/* List card */}
      {ListCard}
    </div>
  );

  if (embedded) {
    // Render only the inner content for embedding inside a parent panel
    return <div className="px-0">{InnerChoiceLayout}</div>;
  }

  if (loading) {
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
          }}
        >
          <div className="flex items-center justify-center h-full text-gray-500">
            Loading quiet hobbies...
          </div>
        </section>
      </div>
    );
  }

  // Full-page panel matching the Choice mock
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
        }}
      >
        {/* Header */}
        <header className="relative px-6 py-5">
          <button
            type="button"
            aria-label="Go back"
            className="absolute left-6 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#FFD2E4] text-[#FF2680] grid place-items-center"
          >
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
              className="flex-1 px-4 py-2 rounded-full text-[#A2A2A2] cursor-not-allowed"
            >
              Task
            </button>
            <button
              type="button"
              aria-current="page"
              className="flex-1 px-4 py-2 rounded-full bg-[#FD8743] text-white font-medium shadow-[inset_0_-1px_0_rgba(0,0,0,0.06)]"
            >
              Choice
            </button>
          </div>
        </div>

        {/* Inner layout */}
        {InnerChoiceLayout}

        {/* Footer */}
        <footer className="px-6 pb-8 grid place-items-center">
          <button
            type="button"
            disabled
            className="w-[360px] h-12 rounded-xl font-semibold shadow-sm bg-[#E3E3E3] text-[#B5B5B5] cursor-not-allowed"
          >
            Finish
          </button>
        </footer>
      </section>
    </div>
  );
}
