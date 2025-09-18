import { useState } from "react"
import styles from './MoreInfo.module.css'
import CloseIcon from '@mui/icons-material/Close';


interface AddInfoButtonProps {
    textboxActive: boolean
    setTextboxActive: Function
    setTitle: Function
    setDescription: Function
    addInfo: Function
    title: string
    description: string
}

export default function AddInfoTextbox({textboxActive, setTextboxActive, setTitle, setDescription, addInfo, title, description}: AddInfoButtonProps) {
    
    //Template function to fetch all events from firebase
    const fetchEvents = () => {
        return 
    }

    //fake data for existing events (will be replaced)
    const existingEvents = [
        {title: "Turn on Water", description: "turn faucet handle to the right"},
        {title: "Turn off Water", description: "turn faucet handle to the left"}
    ]
    
    return (
        <>
            {textboxActive && (
                <div className={styles.popupContainer}>
    
                    <div className={styles.popupHeader}>
                        <CloseIcon
                            sx={{
                                fontSize: 40,
                                '&:hover': {
                                    opacity: "80%"
                                }
                            }}
                            onClick={() => setTextboxActive(false)}
                        />
                    </div>
                    <div style={{ width: "100%" }}>
                            <p>Add existing:</p>
                            <select
                            onChange={(e) => {
                                const selected = existingEvents.find(ev => ev.title === e.target.value);
                                if (selected) {
                                    setTitle(selected.title);
                                    setDescription(selected.description);
                                }
                            }}
                            >
                            <option value="">Select</option>
                            {existingEvents.map((event, i) => (
                                <option key={i} value={event.title}>
                                {event.title}
                                </option>
                            ))}
                            </select>
                            <p>Create New:</p>
                            <div className={styles.createNew}>
                                <input placeholder="Step Title" onChange={(e)=>{setTitle(e.target.value)}}></input>
                                <textarea placeholder="Add instructions here:" onChange={(e)=>{setDescription(e.target.value)}}></textarea>
                            </div>
                            <button className={styles.createInfo} onClick={()=>{addInfo(title, description); setTextboxActive(false)}}>Done</button>
                    </div>
                </div>
            )}
        </>
    )
}