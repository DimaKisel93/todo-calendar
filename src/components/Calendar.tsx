import { useState } from "react";
import { useTodoContext } from "../contexts/TodoContext";
import { Week } from "./Week";
import { groupDaysByWeek } from "../utils/groupDaysByWeek";
import { WeekNavigation } from "./WeekNavigation";

export const Calendar = () => {
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const { profiles } = useTodoContext();

  if (profiles.length === 0) {
    return <div>Loading...</div>;
  }

  const profile = profiles[0];

  if (!profile || !profile.days) {
    return <div>No days available</div>;
  }

  const weeks = groupDaysByWeek(profile.days);

  return (
    <div className="calendar">
      <WeekNavigation
        currentWeekIndex={currentWeekIndex}
        setCurrentWeekIndex={setCurrentWeekIndex}
        totalWeeks={weeks.length}
      />
      <Week days={weeks[currentWeekIndex]} />
    </div>
  );
};
