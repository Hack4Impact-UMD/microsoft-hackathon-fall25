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
    <div className={styles.container}>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Visual Scheduling & Daily Routines
        </h1>
        <p className="text-gray-600 mb-4">
          Scheduling interface for users with first-grade or below reading/math levels
        </p>
        
        {/* View Mode Toggle */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setViewMode('staff')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'staff'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Staff View
          </button>
          <button
            onClick={() => setViewMode('participant')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'participant'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Participant View
          </button>
        </div>

        {/* Selected Activity Display */}
        {selectedActivity && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">Last Selected Activity:</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-lg">📝</span>
              </div>
              <div>
                <p className="font-medium text-green-900">{selectedActivity.name}</p>
                <p className="text-sm text-green-700">
                  Selected at: {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Render appropriate component based on view mode */}
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