import { createEvent, listEvents } from '../services/service'
import styles from './Page.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className='text-3xl'>RISE DC</h1>
      <p>Welcome to RISE DC</p>

      <button onClick={() => console.log(listEvents())}>List Events</button>
      <button onClick={() => createEvent({"name": "test event name"})}>Create Event</button>
    </div>
  )
}
