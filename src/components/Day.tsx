import { Day as DayType } from "../types/types";
import { formatDate } from "../utils/formatDate";

interface DayProps {
  day: DayType;
}

export const Day = ({ day }: DayProps) => {
  return (
    <article className="day">
      <h3>{formatDate(day.date)}</h3>
    </article>
  );
};
