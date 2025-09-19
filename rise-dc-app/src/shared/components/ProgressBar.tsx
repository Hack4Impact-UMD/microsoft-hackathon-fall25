import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import styles from './ProgressBar.module.css'

interface ProgressBarProps extends LinearProgressProps {
    value: number;
}

export default function ProgressBar(props: ProgressBarProps) {
    const { value, className, ...rest } = props;
    return <LinearProgress classes={{
        root: styles.root,
        bar: styles.bar,
    }} variant="determinate" value={value} {...rest} />
}