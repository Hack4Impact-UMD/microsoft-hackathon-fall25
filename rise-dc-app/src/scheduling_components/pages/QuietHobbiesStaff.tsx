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

  // Load hobbies on component mount
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
        // icon will be added later when upload component is integrated
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
      <div className="p-6">
        <div className="flex items-center justify-center h-32">
          <div className="text-gray-500">Loading quiet hobbies...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Manage Quiet Hobbies
        </h1>
        <p className="text-gray-600">
          Create and manage the list of quiet activities that participants can choose from.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
          <button
            onClick={loadHobbies}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Create new hobby form */}
      <div className="mb-6">
        {!isCreating ? (
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add New Quiet Hobby
          </button>
        ) : (
          <form onSubmit={handleCreateHobby} className="flex gap-2">
            <input
              type="text"
              value={newHobbyName}
              onChange={(e) => setNewHobbyName(e.target.value)}
              placeholder="Enter hobby name..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              type="submit"
              disabled={!newHobbyName.trim()}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setNewHobbyName('');
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </form>
        )}
      </div>

      {/* Hobbies list */}
      <div className="space-y-3">
        {hobbies.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No quiet hobbies created yet. Add one above to get started.
          </div>
        ) : (
          hobbies.map((hobby) => (
            <div
              key={hobby.id}
              className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  {/* Icon placeholder - will be replaced with upload component later */}
                  <span className="text-gray-400 text-lg">📝</span>
                </div>
                <div>
                  {editingId === hobby.id ? (
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                  ) : (
                    <h3 className="font-medium text-gray-900">{hobby.name}</h3>
                  )}
                  <p className="text-sm text-gray-500">
                    Created: {new Date(hobby.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {editingId === hobby.id ? (
                  <>
                    <button
                      onClick={() => handleUpdateHobby(hobby.id)}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEditing(hobby)}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteHobby(hobby.id)}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Icon upload placeholder */}
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-medium text-yellow-800 mb-2">Icon Upload Integration</h3>
        <p className="text-sm text-yellow-700">
          Icon upload functionality will be integrated in the next round of tasks. 
          Each quiet hobby will have space for an icon to be uploaded and displayed.
        </p>
      </div>
    </div>
  );
}
