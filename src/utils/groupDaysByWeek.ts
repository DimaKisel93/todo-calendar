import { Day } from '../types/types';

export const groupDaysByWeek = (days: Day[]): Day[][] => {
  const weeks: Day[][] = [];
  let currentWeek: Day[] = [];

  days.forEach((day) => {
    const date = new Date(day.date);
    const dayOfWeek = date.getDay();

    currentWeek.push(day);

    if (dayOfWeek === 0 || days.indexOf(day) === days.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return weeks;
};
