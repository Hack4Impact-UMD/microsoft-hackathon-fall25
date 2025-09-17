import { useState } from "react"
import styles from './MoreInfo.module.css'
import AddInfoTextbox from "./AddInfoTextbox";


interface AddInfoButtonProps {
    
}

export default function AddInfoButton({}: AddInfoButtonProps) {

    const [textboxActive, setTextboxActive] = useState(false);


    return (

        <>
        
            <button onClick={()=>{setTextboxActive(!textboxActive)}}>Add Info</button>
            <AddInfoTextbox textboxActive={textboxActive} setTextboxActive={setTextboxActive}></AddInfoTextbox>
            
        </>
 
    )
}

