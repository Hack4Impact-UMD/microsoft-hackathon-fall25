import { useState } from "react"
import styles from './MoreInfo.module.css'
import CloseIcon from '@mui/icons-material/Close';
import AddInfoButton from "./AddInfoButton";
import { Instruction } from "../../shared/types";

interface MoreInfoPopupProps {
    popupIsOpen: boolean
    setPopupIsOpen: Function
}

export default function MoreInfoPopup ({popupIsOpen,setPopupIsOpen}: MoreInfoPopupProps) {
    const [info, setInfo] = useState<Instruction[]>([])

    const addInfo = (title: string, description: string, stepNumber: number) => {
        setInfo([...info, {
            id: title, instructions: description,
            step_number: stepNumber
        }])
    }
    return (
        <>
            {popupIsOpen ? 
                <div className={styles.popupContainer}>
                    <div className={styles.popupHeader}>
                        <div className={styles.headerActions}>
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
                    {info.slice().sort((a, b) => a.step_number - b.step_number).map((step)=>(
                        <>

                            <h3>Step {step.step_number}: {step.id}</h3>
                            <p>{step.instructions}</p>
                        </>
                    ))}
                    <AddInfoButton addInfo={addInfo}/>
                </div>    
            : ""}
        </>
    )
}