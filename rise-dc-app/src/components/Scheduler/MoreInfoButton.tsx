import { useState } from "react"
import styles from './MoreInfo.module.css'
import MoreInfoPopup from "./MoreInfoPopup"


    const [popupIsOpen, setPopupIsOpen] = useState(false)

    return (
        <>
            <button onClick={()=>{setPopupIsOpen(!popupIsOpen)}}>More Info</button>
            <MoreInfoPopup popupIsOpen={popupIsOpen} setPopupIsOpen={setPopupIsOpen}></MoreInfoPopup>
        </>
    )
}