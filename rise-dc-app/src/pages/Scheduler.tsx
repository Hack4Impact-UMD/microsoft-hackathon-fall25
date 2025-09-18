import { useState } from 'react';
import styles from './Page.module.css';
import ConfirmationModal from '../scheduling_components/ConfirmationModal';

export default function Scheduler() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const taskToConfirm = "Water Plant"; // The task name to display in the modal

  const handleConfirm = () => {
    console.log(`${taskToConfirm} has been abandoned.`);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <h1>Visual Scheduling & Daily Routines</h1>
      <p>Scheduling interface for users with first-grade or below reading/math levels</p>
      
      {/* Button to open the modal */}
      <button 
        onClick={() => setIsModalOpen(true)}
        style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}
      >
        Show Confirmation Modal
      </button>

      {/* The Confirmation Modal component */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title="Are you sure you want to abandon"
        itemName={taskToConfirm}
      />
    </div>
  );
}