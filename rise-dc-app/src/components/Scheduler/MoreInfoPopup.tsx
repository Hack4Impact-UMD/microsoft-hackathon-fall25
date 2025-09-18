import { useState } from "react"
import styles from './MoreInfo.module.css'
import CloseIcon from '@mui/icons-material/Close';
import AddInfoButton from "./AddInfoButton";

interface MoreInfoPopupProps {
    popupIsOpen: boolean
    setPopupIsOpen: Function
}

const placeholderEvents = [
    {title: "Wash Hands", description: "Use soap and water for 1 minute"}
]
export default function MoreInfoPopup ({popupIsOpen,setPopupIsOpen}: MoreInfoPopupProps) {
    const [info, setInfo] = useState(placeholderEvents)

    const addInfo = (title: string, description: string) => {
        setInfo([...info, {title: title, description: description}])
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
                    {info.map((step, index)=>(
                        <>

                            <h3>Step {index+1}: {step.title}</h3>
                            <p>{step.description}</p>
                        </>
                    ))}
                    <AddInfoButton addInfo={addInfo}/>
                </div>    
            : ""}
        </>
    )
}