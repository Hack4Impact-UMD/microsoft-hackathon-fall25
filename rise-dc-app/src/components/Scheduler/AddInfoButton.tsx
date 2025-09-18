import { useState } from "react"
import styles from './MoreInfo.module.css'
import AddInfoTextbox from "./AddInfoTextbox";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

interface AddInfoButtonProps {
    addInfo: Function
}

export default function AddInfoButton({addInfo}: AddInfoButtonProps) {
    const [textboxActive, setTextboxActive] = useState(false);
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    return (

        <>
        
            <AddOutlinedIcon 
                onClick={()=>{setTextboxActive(!textboxActive)}}
                sx = {{
                    borderRadius: "100px",
                    fontSize: 60,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    '&:hover': {
                        opacity: "80%"
                    }
                }}
            >Add Info</AddOutlinedIcon>
            <AddInfoTextbox 
                textboxActive={textboxActive} 
                setTextboxActive={setTextboxActive} 
                setTitle={setTitle} 
                addInfo = {addInfo}
                title = {title}
                description = {description}
                setDescription = {setDescription}></AddInfoTextbox>
            
        </>
 
    )
}

