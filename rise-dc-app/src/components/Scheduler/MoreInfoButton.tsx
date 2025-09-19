import { useState } from "react"
import styles from './MoreInfo.module.css'
import MoreInfoPopup from "./MoreInfoPopup"
import { Instruction } from "../../shared/types"
import InfoIcon from '@mui/icons-material/Info';

interface MoreInfoButtonProps {
    info?: Instruction[]        //if missing, then it will default to the create new instructions version
    title: string               //title of action that the steps describe 
}   
export default function MoreInfoButton ({info}: MoreInfoButtonProps) {
    const [popupIsOpen, setPopupIsOpen] = useState(false)

    return (
        <>
            <InfoIcon onClick={()=>{setPopupIsOpen(!popupIsOpen)}}>More Info</InfoIcon>
            <MoreInfoPopup popupIsOpen={popupIsOpen} setPopupIsOpen={setPopupIsOpen} existingInfo={info ? info : []}></MoreInfoPopup>
        </>
    )
}