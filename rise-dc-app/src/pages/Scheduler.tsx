import moment from 'moment'
import WhatsNextButton from '../shared/components/WhatsNextButton'
import styles from './Page.module.css'

export default function Scheduler() {
  return (
    <div className={styles.container}>
      <h1>Visual Scheduling & Daily Routines</h1>
      <p>Scheduling interface for users with first-grade or below reading/math levels</p>
      <WhatsNextButton events={[
        {
          startTime: moment(moment.now()).add(10, 'minutes').toString(),
          endTime: moment(moment.now()).add(40, 'minutes').toString(),
          id: "foo",
          title: "Test Event"
        }
      ]} />
    </div>
  )
}
