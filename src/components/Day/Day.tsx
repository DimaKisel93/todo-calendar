import { Day as DayType } from '../../types/types';
import { formatDate } from '../../utils/formatDate';
import styles from './Day.module.scss';

interface DayProps {
  day: DayType;
  onClick: () => void;
}

export const Day = ({ day, onClick }: DayProps) => {
  return (
    <article
      className={`${styles.day} ${day.isDayOff ? styles.day_off : ''}`}
      onClick={onClick}
    >
      <h3>{formatDate(day.date)}</h3>
    </article>
  );
};
