import styles from './MoreInfo.module.css'
import MenuIcon from '@mui/icons-material/Menu';

interface GoalProps {
    step: number
}
export default function Goal({step}: GoalProps) {
    return (
        <>
            <div className={styles.goal}>
                <p className={styles.step}>{step}</p>
                <input type="text" placeholder='Add Instructions...'></input>
                <MenuIcon sx={{
                    color: "rgba(253, 135, 67, 1)",
                }}></MenuIcon>
            </div>
        </>
    )
}