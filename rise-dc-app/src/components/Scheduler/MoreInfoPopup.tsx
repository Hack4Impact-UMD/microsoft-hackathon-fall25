import { useState } from "react"
import styles from './MoreInfo.module.css'
import CloseIcon from '@mui/icons-material/Close';

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
                        <CloseIcon 
                            sx={{
                                fontSize: 40,
                                '&:hover': {
                                    opacity: "80%"
                                }
                            }} 
                            onClick={()=>{setPopupIsOpen(false)}}
                        ></CloseIcon>
                    </div>
                </div>    
            : ""}
        </>
    )
}