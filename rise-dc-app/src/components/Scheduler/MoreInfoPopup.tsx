import { useState } from "react"
import styles from './MoreInfo.module.css'
import CloseIcon from '@mui/icons-material/Close';
import AddInfoButton from "./AddInfoButton";

interface MoreInfoPopupProps {
    popupIsOpen: boolean
    setPopupIsOpen: Function
}
export default function MoreInfoPopup ({popupIsOpen,setPopupIsOpen}: MoreInfoPopupProps) {

    return (
        <>
            {popupIsOpen ? 
                <div className={styles.popupContainer}>
                    <div className={styles.popupHeader}>
                        <div className={styles.headerActions}>
                            <AddInfoButton />
                            <CloseIcon 
                                sx={{
                                    fontSize: 40,
                                    marginLeft: "12px",
                                    cursor: "pointer",
                                    '&:hover': {
                                        opacity: "80%"
                                    }
                                }} 
                                onClick={()=>{setPopupIsOpen(false)}}
                            />
                        </div>
                    </div>
                    {/* Other popup content here */}
                </div>    
            : ""}
        </>
    )
}