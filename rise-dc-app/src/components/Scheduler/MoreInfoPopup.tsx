import { useState } from "react"
import styles from './MoreInfo.module.css'
import CloseIcon from '@mui/icons-material/Close';
import AddInfoButton from "./AddInfoButton";
import { Instruction } from "../../shared/types";
import Goal from "./Goal";
import BackArrow from '@mui/icons-material/Reply';
import EditIcon from '@mui/icons-material/Edit';

interface MoreInfoPopupProps {
    popupIsOpen: boolean
    setPopupIsOpen: Function
    existingInfo: Instruction[]
}

export default function MoreInfoPopup ({popupIsOpen,setPopupIsOpen, existingInfo}: MoreInfoPopupProps) {
    const [info, setInfo] = useState<Instruction[]>(existingInfo)
    
    const addInfo = () => {

        setInfo([...info, {
            id: "",
            step_number: info.length + 1,
            instructions: ""
        }])
    }

    const handleDelete = (stepNumber: number) => {
  setInfo((prev) => prev.filter((goal) => goal.step_number !== stepNumber));
};

    return (
        <>
            {popupIsOpen ? 
                <div className={styles.popupContainer}>
                    <div className={styles.popupHeader}>
                                <BackArrow 
                                    sx={{
                                        fontSize: 40,
                                        backgroundColor: "rgba(244, 77, 133, 1)",
                                        borderRadius: 100,
                                        color: "white",
                                        '&:hover': {
                                            opacity: "80%"
                                        }
                                    }}
                                />
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
                    
                    <div className={styles.goalContainer}>
                        <div className={styles.goalImageContainer}>
                            <div className={styles.goalImage}>
                        <EditIcon sx={{fontSize: 50}}></EditIcon>
                            </div>
                        </div>
                    <div className={styles.goals}>
                        {info.map((goal) => (
                            <div key={goal.step_number} className={styles.goalRow}>
                            <Goal step={goal.step_number} />
                            <CloseIcon 
                                sx={{
                                fontSize: 20,
                                color: "#EB5904",
                                cursor: "pointer",
                                marginLeft: "8px",
                                '&:hover': { opacity: "80%" }
                                }}
                                onClick={() => handleDelete(goal.step_number)}
                            />
                            </div>
                        ))}
                        </div>

                        <AddInfoButton addInfo={addInfo}/>
                    </div>
                </div>    
            : ""}
        </>
    )
}