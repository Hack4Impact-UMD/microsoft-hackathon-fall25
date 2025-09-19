import { useState } from 'react';
import styles from './Page.module.css';
import QuietHobbiesStaff from '../scheduling_components/pages/QuietHobbiesStaff';
import QuietHobbiesParticipant from '../scheduling_components/pages/QuietHobbiesParticipant';
import { QuietHobby } from '../scheduling_components/quiet_hobbies/types';

export default function Scheduler() {
  const [viewMode, setViewMode] = useState<'staff' | 'participant'>('staff');
  const [selectedActivity, setSelectedActivity] = useState<QuietHobby | null>(null);

  const handleActivityChosen = (hobby: QuietHobby) => {
    setSelectedActivity(hobby);
    console.log('Activity chosen:', hobby);
  };

  const handlePhotoTaken = () => {
    console.log('Photo taken');
  };

  return (
    <div className={`${styles.container} min-h-screen bg-gray-50`}>
      <div className="mb-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Visual Scheduling & Daily Routines
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            Scheduling interface for users with first-grade or below reading/math levels
          </p>
        </div>
        
        {/* View Mode Toggle */}
        <div className="flex justify-center gap-6 mb-8">
          <button
            onClick={() => setViewMode('staff')}
            className={`px-8 py-4 rounded-2xl text-xl font-bold transition-all ${
              viewMode === 'staff'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 active:scale-98'
            }`}
          >
            Staff View
          </button>
          <button
            onClick={() => setViewMode('participant')}
            className={`px-8 py-4 rounded-2xl text-xl font-bold transition-all ${
              viewMode === 'participant'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 active:scale-98'
            }`}
          >
            Participant View
          </button>
        </div>

        {/* Selected Activity Display */}
        {selectedActivity && (
          <div className="mb-8 p-6 bg-green-50 border-2 border-green-200 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-green-900 mb-4 text-center">Last Selected Activity:</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                <span className="text-green-600 text-2xl">📝</span>
              </div>
              <div>
                <p className="text-xl font-bold text-green-900">{selectedActivity.name}</p>
                <p className="text-lg text-green-700">
                  Selected at: {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {viewMode === 'staff' ? (
        <QuietHobbiesStaff
          onHobbyCreated={(hobby) => console.log('Hobby created:', hobby)}
          onHobbyUpdated={(hobby) => console.log('Hobby updated:', hobby)}
          onHobbyDeleted={(id) => console.log('Hobby deleted:', id)}
        />
      ) : (
        <QuietHobbiesParticipant
          onActivityChosen={handleActivityChosen}
          onPhotoTaken={handlePhotoTaken}
        />
      )}
    </div>
  );
}