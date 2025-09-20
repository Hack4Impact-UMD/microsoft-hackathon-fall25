import { useEffect, useState } from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import styles from "./TimerBarScheduler.module.css";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import EventComplete from "../scheduling_components/EventCompletion";

interface ProgressBarProps extends Omit<LinearProgressProps, "value"> {
  duration: number;
  startHour: number;
  startMinute: number;
}

export default function ProgressBar({
  duration,
  startHour,
  startMinute = 0,
  className,
  ...rest
}: ProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  const [isEventComplete, setIsEventComplete] = useState(false);
  const openPopup = () => setIsEventComplete(true);
  const closePopup = () => setIsEventComplete(false);

  useEffect(() => {
    const now = new Date();
    let startTime = new Date();
    startTime.setHours(startHour, startMinute, 0, 0);

    const delay = startTime.getTime() - now.getTime();

    const timeout = setTimeout(() => {
      const realStart = Date.now();
      const timer = setInterval(() => {
        const elapsed = Date.now() - realStart;
        const percentage = Math.min((elapsed / duration) * 100, 100);
        setProgress(percentage);

        if (percentage >= 100) setCompleted(true);

        if (elapsed >= duration) {
          clearInterval(timer);
        }
      }, 20);
    }, delay);

    return () => clearTimeout(timeout);
  }, [duration, startHour, startMinute]);

  const getColor = () => {
    if (progress < 33) return "#0a0032ff"; // green
    if (progress < 66) return "#FD8743"; // orange
    return "#4caf50"; // red
  };

  return (
    <Box position="relative" width="100%" height="40px">
      {/* Progress bar */}
      <Fade in={!completed} timeout={500}>
        <LinearProgress
          classes={{ root: styles.root, bar: styles.bar }}
          variant="determinate"
          value={progress}
          sx={{
            "& .MuiLinearProgress-bar": {
              backgroundColor: getColor(),
              transition: "background-color 0.2s linear, width 0.1s linear",
            },
          }}
          {...rest}
        />
      </Fade>

      {/* Buttons stacked on top of progress bar */}
      <Fade in={completed} timeout={500}>
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          display="flex"
          justifyContent="justify-start"
          alignItems="center"
          gap={2}
        >
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#2DA75A",
              fontFamily: "Lexend",
              color: "#fff",
              "&:hover": { backgroundColor: "#43a047" },
            }}
            onClick={openPopup}
          >
            ✓ Mark as Done
          </Button>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              fontFamily: "Lexend",
              color: "#fff",
              backgroundColor: "#ff2680ff",
              "&:hover": { backgroundColor: "#ff95c1ff" },
            }}
          >
            Cancel
          </Button>
          {isEventComplete && (
            <EventComplete event="brush your teeth" onClose={closePopup} />
          )}
        </Box>
      </Fade>
    </Box>
  );
}
