import { useMemo } from "react";

export function DayDisplay() {
    function dayNumberToDay(dayNumber: number) {
        if (dayNumber === 0) {
            return "Sunday";
        } else if (dayNumber === 1) {
            return "Monday";
        } else if (dayNumber === 2) {
            return "Tuesday";
        } else if (dayNumber === 3) {
            return "Wednesday";
        } else if (dayNumber === 4) {
            return "Thursday";
        } else if (dayNumber === 5) {
            return "Friday";
        } else if (dayNumber === 6) {
            return "Saturday";
        }
    }

    const currDay = useMemo(() => dayNumberToDay(new Date().getDay()), []);
    
    return (
        <div className="flex max-w-100 text-center pt-3 pr-15 pb-4 pl-15 items-center justify-center bg-[#0C77D9] rounded-b-xl pointer-events-none">
            <p className="text-white font-light text-[1.2rem]">
                { currDay }
            </p>
        </div>
    )
}