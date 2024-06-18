import { useState, useEffect } from 'react';
import { Day as DayType } from '../../types/types';
import { Day } from '../Day/Day';
import { Modal } from '../TaskModal/TaskModal';
import styles from './Week.module.scss';

interface WeekProps {
  days: DayType[];
}

export const Week = ({ days }: WeekProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<DayType | null>(null);

  const openTaskModal = (day: DayType) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsModalOpen(false);
    setSelectedDay(null);
  };

  useEffect(() => {
    if (isModalOpen && selectedDay) {
      const updatedDay = days.find((day) => day.date === selectedDay.date);
      if (updatedDay && updatedDay !== selectedDay) {
        setSelectedDay(updatedDay);
      }
    }
  }, [days]);

  if (!days || days.length === 0) {
    return <div>No days available for this week</div>;
  }

  return (
    <section className={styles.week}>
      {days.map((day) => (
        <Day key={day.date} day={day} onClick={() => openTaskModal(day)} />
      ))}
      {isModalOpen && selectedDay && (
        <Modal day={selectedDay} handleTaskModalClose={closeTaskModal} />
      )}
    </section>
  );
};
