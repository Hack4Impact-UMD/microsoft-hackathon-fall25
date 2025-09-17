import { useState } from "react"
import styles from './MoreInfo.module.css'
import CloseIcon from '@mui/icons-material/Close';


interface AddInfoButtonProps {
    textboxActive: boolean
    setTextboxActive: Function
}

export default function AddInfoTextbox({textboxActive, setTextboxActive}: AddInfoButtonProps) {
    const [info, setInfo] = useState("");

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
                        <textarea
                            value={info}
                            onChange={e => setInfo(e.target.value)}
                            className={styles.textarea}
                            rows={22}
                            placeholder="Type your instructions or info here..."
                        />
                    </div>
                </div>
            )}
        </>
    )
}