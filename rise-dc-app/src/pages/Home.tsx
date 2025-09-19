import TimerBarScheduler from '../scheduling_components/TimerBarScheduler'
import styles from './Page.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className='text-3xl'>RISE DC</h1>
      <p>Welcome to RISE DC</p>
    </div>
  )
}