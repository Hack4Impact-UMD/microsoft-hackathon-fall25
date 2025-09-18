import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        RISE DC
      </Link>
      <Link to="/cookbook" className={styles.link}>
        Cookbook
      </Link>
      <Link to="/scheduler" className={styles.link}>
        Scheduler
      </Link>
    </nav>
  )
}