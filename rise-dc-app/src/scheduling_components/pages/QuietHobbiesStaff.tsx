import { useState, useEffect } from 'react';
import { QuietHobby, QuietHobbiesStaffProps, CreateQuietHobbyRequest } from '../quiet_hobbies/types';
import { quietHobbiesApi } from '../quiet_hobbies/api';

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
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Manage Quiet Hobbies
        </h1>
        <p className="text-xl text-gray-600">
          Create and manage the list of quiet activities that participants can choose from.
        </p>
      </div>

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
            <button
              onClick={() => setIsCreating(true)}
              className="px-8 py-4 bg-blue-600 text-white rounded-2xl text-xl font-bold hover:bg-blue-700 active:scale-98 transition-all shadow-lg"
            >
              + Add New Quiet Hobby
            </button>
          </div>
        ) : (
          <form onSubmit={handleCreateHobby} className="flex gap-4 max-w-2xl mx-auto">
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

      {/* Hobbies list */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {hobbies.length === 0 ? (
          <div className="col-span-full text-center py-16 text-2xl text-gray-500">
            No quiet hobbies created yet. Add one above to get started.
          </div>
        ) : (
          hobbies.map((hobby) => (
            <div
              key={hobby.id}
              className="bg-white border-2 border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
                    {/* Icon placeholder - will be replaced with upload component later */}
                    <span className="text-gray-400 text-2xl">📝</span>
                  </div>
                  <div className="flex-1">
                    {editingId === hobby.id ? (
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400"
                        autoFocus
                      />
                    ) : (
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{hobby.name}</h3>
                    )}
                    <p className="text-base text-gray-500">
                      Created: {new Date(hobby.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="mt-auto">
                  {editingId === hobby.id ? (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleUpdateHobby(hobby.id)}
                        className="flex-1 px-4 py-3 bg-green-600 text-white text-lg font-semibold rounded-xl hover:bg-green-700 active:scale-98 transition-all"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="flex-1 px-4 py-3 bg-gray-500 text-white text-lg font-semibold rounded-xl hover:bg-gray-600 active:scale-98 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={() => startEditing(hobby)}
                        className="flex-1 px-4 py-3 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 active:scale-98 transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteHobby(hobby.id)}
                        className="flex-1 px-4 py-3 bg-red-600 text-white text-lg font-semibold rounded-xl hover:bg-red-700 active:scale-98 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Icon upload placeholder */}
      <div className="mt-12 p-8 bg-yellow-50 border-2 border-yellow-200 rounded-2xl text-center">
        <h3 className="text-2xl font-bold text-yellow-800 mb-4">Icon Upload Integration</h3>
        <p className="text-lg text-yellow-700">
          Icon upload functionality will be integrated in the next round of tasks. 
          Each quiet hobby will have space for an icon to be uploaded and displayed.
        </p>
      </div>
    </div>
  );
}
