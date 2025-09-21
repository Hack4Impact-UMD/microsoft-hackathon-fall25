import { useState, useEffect } from 'react';
import { QuietHobby, QuietHobbiesStaffProps, CreateQuietHobbyRequest } from '../quiet_hobbies/types';
import { quietHobbiesApi } from '../quiet_hobbies/api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


export default function QuietHobbiesStaff({ 
  onHobbyCreated, 
  onHobbyUpdated, 
  onHobbyDeleted 
}: QuietHobbiesStaffProps) {
  const [hobbies, setHobbies] = useState<QuietHobby[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newHobbyName, setNewHobbyName] = useState('');
  const [editingName, setEditingName] = useState('');

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
      setError('Failed to load quiet hobbies');
      console.error('Error loading hobbies:', err);
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
      setHobbies(prev => [...prev, newHobby]);
      setNewHobbyName('');
      setIsCreating(false);
      onHobbyCreated?.(newHobby);
    } catch (err) {
      setError('Failed to create quiet hobby');
      console.error('Error creating hobby:', err);
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
        setHobbies(prev => 
          prev.map(hobby => hobby.id === id ? updatedHobby : hobby)
        );
        setEditingId(null);
        setEditingName('');
        onHobbyUpdated?.(updatedHobby);
      }
    } catch (err) {
      setError('Failed to update quiet hobby');
      console.error('Error updating hobby:', err);
    }
  };

  const handleDeleteHobby = async (id: string) => {
    if (!confirm('Are you sure you want to delete this quiet hobby?')) return;

    try {
      const success = await quietHobbiesApi.delete(id);
      if (success) {
        setHobbies(prev => prev.filter(hobby => hobby.id !== id));
        onHobbyDeleted?.(id);
      }
    } catch (err) {
      setError('Failed to delete quiet hobby');
      console.error('Error deleting hobby:', err);
    }
  };

  const startEditing = (hobby: QuietHobby) => {
    setEditingId(hobby.id);
    setEditingName(hobby.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingName('');
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-2xl text-gray-500">Loading quiet hobbies...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-lexend">
    <div className="p-8 max-w-6xl mx-auto">
     

      {error && (
        <div className="mb-6 p-6 bg-red-50 border-2 border-red-200 rounded-2xl">
          <p className="text-lg text-red-600 mb-3">{error}</p>
          <button
            onClick={loadHobbies}
            className="px-6 py-3 bg-red-600 text-white rounded-xl text-lg font-semibold hover:bg-red-700 active:scale-98 transition-all"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Create new hobby form */}
      <div className="mb-8">
        {!isCreating ? (
          <div className="text-center">
            {/* <button
              onClick={() => setIsCreating(true)}
              className="px-8 py-4 bg-blue-600 text-white rounded-2xl text-xl font-bold hover:bg-blue-700 active:scale-98 transition-all shadow-lg"
            >
              + Add New Quiet Hobby
            </button> */}
          </div>
        ) : (
          <div></div>
          // <form onSubmit={handleCreateHobby} className="flex gap-4 max-w-2xl mx-auto">
          //   <input
          //     type="text"
          //     value={newHobbyName}
          //     onChange={(e) => setNewHobbyName(e.target.value)}
          //     placeholder="Enter hobby name..."
          //     className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-2xl text-lg focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all"
          //     autoFocus
          //   />
          //   <button
          //     type="submit"
          //     disabled={!newHobbyName.trim()}
          //     className="px-8 py-4 bg-green-600 text-white rounded-2xl text-lg font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed active:scale-98 transition-all"
          //   >
          //     Save
          //   </button>
          //   <button
          //     type="button"
          //     onClick={() => {
          //       setIsCreating(false);
          //       setNewHobbyName('');
          //     }}
          //     className="px-8 py-4 bg-gray-500 text-white rounded-2xl text-lg font-bold hover:bg-gray-600 active:scale-98 transition-all"
          //   >
          //     Cancel
          //   </button>
          // </form>
        )}
      </div>

      {/* Hobbies list */}
<div className="max-h-[500px] overflow-y-auto px-2 w-175 rounded-3xl border-2 border-gray-300">

  {/* Existing hobbies */}
  {hobbies.length === 0 ? (
    <div className="text-center py-16 text-2xl text-gray-500">
      No quiet hobbies created yet. Add one below to get started.
    </div>
  ) : (
    hobbies.map((hobby) => (
      <div
        key={hobby.id}
        className="bg-white border-gray-200 rounded-2xl p-6 transition-shadow flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          {/* <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
            <span className="text-gray-400 text-2xl">📝</span>
          </div> */}
          <div className="flex flex-col">
            {editingId === hobby.id ? (
              <input
                type="text"
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                className="w-full px-4 py-2 border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400"
                autoFocus
              />
            ) : (
              <h3 className="text-xl font-bold text-gray-900">{hobby.name}</h3>
            )}
            <p className="text-base text-gray-500">
              Created: {new Date(hobby.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {editingId === hobby.id ? (
            <>
              <button
                onClick={() => handleUpdateHobby(hobby.id)}
                className="p-2 bg-green-600 text-white rounded-full"
              >
                Save
              </button>
              <button
                onClick={cancelEditing}
                className="p-2 bg-gray-500 text-white rounded-full"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <EditIcon
                className="cursor-pointer text-orange-600 hover:text-blue-700"
                onClick={() => startEditing(hobby)}
              />
              <DeleteIcon
                className="cursor-pointer text-orange-600 hover:text-red-700"
                onClick={() => handleDeleteHobby(hobby.id)}
              />
            </>
          )}
        </div>
      </div>
    ))
  )}

  {/* Add New Hobby button/form inside scroll */}
  <div className="flex justify-center">
    {!isCreating ? (
      <button
        onClick={() => setIsCreating(true)}
        className="px-8 py-4 text-black rounded-2xl font-bold active:scale-98 transition-all shadow-lg"
      >
        + Add Option...
      </button>
    ) : (
      <form onSubmit={handleCreateHobby} className="flex gap-4 max-w-2xl w-full">
        <input
          type="text"
          value={newHobbyName}
          onChange={(e) => setNewHobbyName(e.target.value)}
          placeholder="Enter hobby name..."
          className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-2xl text-lg focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all"
          autoFocus
        />
        <button
          type="submit"
          disabled={!newHobbyName.trim()}
          className="px-8 py-4 bg-green-600 text-white rounded-2xl text-lg font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed active:scale-98 transition-all"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => {
            setIsCreating(false);
            setNewHobbyName('');
          }}
          className="px-8 py-4 bg-gray-500 text-white rounded-2xl text-lg font-bold hover:bg-gray-600 active:scale-98 transition-all"
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
}
