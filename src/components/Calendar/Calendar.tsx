import { useState } from 'react';
import { useTodoContext } from '../../contexts/TodoContext';
import { Week } from '../Week/Week';
import { groupDaysByWeek } from '../../utils/groupDaysByWeek';
import { WeekNavigation } from '../Week/WeekNavigation';
import styles from './Calendar.module.scss';

export const Calendar = () => {
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const { selectedProfile } = useTodoContext();

  if (!selectedProfile || !selectedProfile.days) {
    return <div>No days available</div>;
  }

  const weeks = groupDaysByWeek(selectedProfile.days);

  return (
    <div className={styles.calendar}>
      <WeekNavigation
        currentWeekIndex={currentWeekIndex}
        setCurrentWeekIndex={setCurrentWeekIndex}
        totalWeeks={weeks.length}
      />
      <Week days={weeks[currentWeekIndex]} />
    </div>
  );
};
