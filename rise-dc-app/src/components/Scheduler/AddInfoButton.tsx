import { useState } from "react"
import styles from './MoreInfo.module.css'
import AddInfoTextbox from "./AddInfoTextbox";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';


interface AddInfoButtonProps {
    addInfo: Function
}

export default function AddInfoButton({addInfo}: AddInfoButtonProps) {
    return (

        <>
            <button className={styles.addGoalButton} onClick={()=>{addInfo()}}>
                + Add Goal
            </button>
        </>
 
    )
}

