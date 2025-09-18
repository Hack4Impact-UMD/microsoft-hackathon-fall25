import MoreInfoButton from '../components/Scheduler/MoreInfoButton'
import styles from './Page.module.css'

export default function Scheduler() {
  return (
    <div className={styles.container}>
      <h1>Visual Scheduling & Daily Routines</h1>
      <p>Scheduling interface for users with first-grade or below reading/math levels</p>
      <MoreInfoButton></MoreInfoButton>
    </div>
  )
}