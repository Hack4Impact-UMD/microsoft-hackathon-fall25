import IconCard from '../scheduling_components/icon_components/icon_card';

import styles from './Page.module.css'

// filler logic for now 
export default function Scheduler() {

  const handleIconSelect = (category: string, iconName: string, iconType: string) => {
    console.log(`Selected ${category}: ${iconName} (${iconType})`);
  };

  return (
    <div className={styles.container}>
      <h1>Visual Scheduling & Daily Routines</h1>
      <p>Scheduling interface for users with first-grade or below reading/math levels</p>
      <IconCard onIconSelect={handleIconSelect} />
    </div>
  )
}

