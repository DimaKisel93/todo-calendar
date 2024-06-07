import { Day as DayType } from "../types/types";
import { Day } from "./Day";

interface WeekProps {
  days: DayType[];
}

export const Week = ({ days }: WeekProps) => {
  if (!days || days.length === 0) {
    return <div>No days available for this week</div>;
  }
  return (
    <section className="week">
      {days.map((day) => (
        <Day key={day.date} day={day} />
      ))}
    </section>
  );
};
