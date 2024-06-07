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
    <nav className="week-navigation">
      <button
        className="week-navigation__button"
        onClick={handlePreviousWeek}
        disabled={currentWeekIndex === 0}
      >
        Предыдущая неделя
      </button>
      <span className="week-navigation__current-week">
        Неделя {currentWeekIndex + 1} из {totalWeeks}
      </span>
      <button
        className="week-navigation__button"
        onClick={handleNextWeek}
        disabled={currentWeekIndex === totalWeeks - 1}
      >
        Следующая неделя
      </button>
    </nav>
  );
};
