import { useState } from "react"
import styles from './MoreInfo.module.css'
import MoreInfoPopup from "./MoreInfoPopup"

interface MoreInfoButtonProps {

}
export default function MoreInfoButton ({}: MoreInfoButtonProps) {
    const [popupIsOpen, setPopupIsOpen] = useState(false)

    return (
        <>
            <button className={styles.moreInfoButton} onClick={()=>{setPopupIsOpen(!popupIsOpen)}}>More Info</button>
            <MoreInfoPopup popupIsOpen={popupIsOpen} setPopupIsOpen={setPopupIsOpen}></MoreInfoPopup>
        </>
    )
}