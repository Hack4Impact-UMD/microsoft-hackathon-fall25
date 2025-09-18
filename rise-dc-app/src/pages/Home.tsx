import React from 'react'
import ProgressBar from '../cookbook_components/ProgressBar'
import styles from './Page.module.css'

export default function Home() {
  const [step, changeStep] = React.useState(0)

  return (
    <div className={styles.container}>
      <h1 className='text-3xl'>RISE DC</h1>
      <p>Welcome to RISE DC</p>
    </div>
  )
}