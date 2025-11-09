import { useEffect, useState } from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import styles from "./TimerBarScheduler.module.css";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";

interface ProgressBarProps extends Omit<LinearProgressProps, "value"> {
  duration: number;
  startHour: number;
  startMinute: number;
  eventName: string;
  onMarkAsDone?: (eventName: string) => void;
}

export default function ProgressBar({
  duration,
  startHour,
  startMinute = 0,
  eventName,
  onMarkAsDone,
  className,
  ...rest
}: ProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [eventPassed, setEventPassed] = useState(false);

  useEffect(() => {
    const now = new Date();
    let startTime = new Date();
    startTime.setHours(startHour, startMinute, 0, 0);

    let endTime = new Date(startTime.getTime() + duration);

    const delay = startTime.getTime() - now.getTime();
    const timeUntilEnd = endTime.getTime() - now.getTime();

    // Check if the entire event has already passed
    if (timeUntilEnd <= 0) {
      setEventPassed(true);
      return;
    }

    // If event is in the future, don't show anything
    if (delay > 0) {
      return;
    }

    // If the start time has already passed but event hasn't finished, show immediately
    setShowProgressBar(true);

    // Calculate how much time has already elapsed since the event started
    const timeAlreadyElapsed = now.getTime() - startTime.getTime();
    const initialProgress = Math.min(
      (timeAlreadyElapsed / duration) * 100,
      100,
    );
    setProgress(initialProgress);

    const realStart = Date.now() - timeAlreadyElapsed; // Adjust for time already passed
    const timer = setInterval(() => {
      const elapsed = Date.now() - realStart;
      const percentage = Math.min((elapsed / duration) * 100, 100);
      setProgress(percentage);

      if (percentage >= 100) setCompleted(true);

      if (elapsed >= duration) {
        clearInterval(timer);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [duration, startHour, startMinute]);

  const getColor = () => {
    if (progress < 33) return "#0a0032ff";
    if (progress < 66) return "#FD8743";
    return "#4caf50";
  };

  const handleMarkAsDone = () => {
    if (onMarkAsDone) {
      onMarkAsDone(eventName);
    }
  };

  // Show "Mark as Done" button for events that have completely passed
  if (eventPassed) {
    return (
      <Box position="relative" width="100%" height="40px">
        <Box
          width="100%"
          height="100%"
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          gap={2}
        >
          <Button
            variant="contained"
            onClick={handleMarkAsDone}
            sx={{
              textTransform: "none",
              backgroundColor: "#2DA75A",
              fontFamily: "Lexend",
              color: "#fff",
              "&:hover": { backgroundColor: "#43a047" },
            }}
          >
            ✓ Mark as Done
          </Button>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              fontFamily: "Lexend",
              color: "#c96468ff",
              borderColor: "#ccc",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    );
  }

  // Don't render anything if it's not time for the event yet or if event is in future
  if (!showProgressBar) {
    return null;
  }

  return (
    <Box
      position="relative"
      width="100%"
      height="40px"
      sx={{ pointerEvents: completed ? "none" : "auto" }}
    >
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
          justifyContent="flex-start"
          alignItems="center"
          gap={2}
          sx={{ pointerEvents: "auto" }} // Add this line
        >
          <Button
            variant="contained"
            onClick={handleMarkAsDone}
            sx={{
              textTransform: "none",
              backgroundColor: "#2DA75A",
              fontFamily: "Lexend",
              color: "#fff",
              pointerEvents: "auto", // Add this too
              "&:hover": { backgroundColor: "#43a047" },
            }}
          >
            ✓ Mark as Done
          </Button>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              fontFamily: "Lexend",
              color: "#c96468ff",
              borderColor: "#ccc",
              pointerEvents: "auto", // Add this too
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Fade>
    </Box>
  );
}
