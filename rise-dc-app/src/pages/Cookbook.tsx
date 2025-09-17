import styles from './Page.module.css'
import Button from '../components/button'

export default function Cookbook() {
  return (
    <div className={styles.container}>
      <h1>Adaptive Digital Cookbook</h1>
      <p>Digital cookbook for users with cognitive and literacy challenges</p>
      <Button text = 'test btn'/>
    </div>
  )
}