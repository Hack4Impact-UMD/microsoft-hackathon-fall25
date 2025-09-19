import { useState } from "react"
import styles from './MoreInfo.module.css'
import CloseIcon from '@mui/icons-material/Close';
import AddInfoButton from "./AddInfoButton";
import { Instruction } from "../../shared/types";

interface MoreInfoPopupProps {
    popupIsOpen: boolean
    setPopupIsOpen: Function
    existingInfo: Instruction[]
}

export default function MoreInfoPopup ({popupIsOpen,setPopupIsOpen, existingInfo}: MoreInfoPopupProps) {
    const [info, setInfo] = useState<Instruction[]>(existingInfo)

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
                                    backgroundColor: "rgba(244, 77, 133, 1)",
                                    borderRadius: 100,
                                    color: "white",
                                    '&:hover': {
                                        opacity: "80%"
                                    }
                                }}
                                onClick={()=>{setPopupIsOpen(false)}}
                            />
                        </div>                        
                    </div>
                    {info ? <h1 className="instructionsTitle">Create New Instructions</h1>: ""}
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