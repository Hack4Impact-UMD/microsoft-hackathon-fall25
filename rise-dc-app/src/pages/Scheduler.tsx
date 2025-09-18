import { useState } from 'react';
import styles from './Page.module.css';
import ConfirmationModal from '../scheduling_components/ConfirmationModal';
import TaskCreationModal from '../scheduling_components/TaskCreationModal';

export default function Scheduler() {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Array<{name: string, steps: string[]}>>([]);
  const taskToConfirm = "Water Plant"; // The task name to display in the modal

  const handleConfirm = () => {
    console.log(`${taskToConfirm} has been abandoned.`);
    setConfirmModalOpen(false);
  };

  const handleCancel = () => {
    setConfirmModalOpen(false);
  };

  const handleAddTask = (taskName: string, taskSteps: string[]) => {
    const newTask = { name: taskName, steps: taskSteps };
    setTasks(prevTasks => [...prevTasks, newTask]);
    console.log('Task added:', newTask);
  };

  return (
    <div className={styles.container}>
      <h1>Visual Scheduling & Daily Routines</h1>
      <p>Scheduling interface for users with first-grade or below reading/math levels</p>
      
      {/* Button to open the confirmation modal
      <button 
        onClick={() => setConfirmModalOpen(true)}
        style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}
      >
        Show Confirmation Modal
      </button> */}

      {/* Button to open the task creation modal */}
      <button 
        onClick={() => setTaskModalOpen(true)}
        style={{ marginTop: '20px', marginLeft: '20px', padding: '10px 20px', fontSize: '16px' }}
      >
        Custom Task
      </button>

      {/* The Confirmation Modal component */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title="Are you sure you want to abandon"
        itemName={taskToConfirm}
      />

      {/* The Task Creation Modal component */}
      <TaskCreationModal
        isOpen={isTaskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
}
