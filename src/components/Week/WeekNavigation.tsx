import styles from "./Week.module.scss";

interface WeekNavigationProps {
  currentWeekIndex: number;
  setCurrentWeekIndex: (index: number) => void;
  totalWeeks: number;
}

export const WeekNavigation = ({
  currentWeekIndex,
  setCurrentWeekIndex,
  totalWeeks,
}: WeekNavigationProps) => {
  const handlePreviousWeek = () => {
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1);
    }
  };

  const handleNextWeek = () => {
    if (currentWeekIndex < totalWeeks - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1);
    }
  };

  return (
    <nav className={styles.week_navigation}>
      <button
        className={styles.navigation_button}
        onClick={handlePreviousWeek}
        disabled={currentWeekIndex === 0}
      >
        Предыдущая неделя
      </button>
      <span className={styles.navigation_current_week}>
        Неделя {currentWeekIndex + 1} из {totalWeeks}
      </span>
      <button
        className={styles.navigation_button}
        onClick={handleNextWeek}
        disabled={currentWeekIndex === totalWeeks - 1}
      >
        Следующая неделя
      </button>
    </nav>
  );
};
