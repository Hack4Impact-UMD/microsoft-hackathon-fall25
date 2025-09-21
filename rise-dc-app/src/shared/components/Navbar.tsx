import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <div className={styles.logoCircle}>
          <img src={"/logo.png"} alt="Logo" className={styles.logoImg}/>
        </div>
      </Link>
    </nav>
  )
}

