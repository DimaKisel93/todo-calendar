import React, { useState } from 'react';
import { useTodoContext } from '../../contexts/TodoContext';
import { Day, Task } from '../../types/types';
import { formatDate } from '../../utils/formatDate';
import styles from './TaskModal.module.scss';

interface ModalProps {
  day: Day;
  handleTaskModalClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ day, handleTaskModalClose }) => {
  const { addTask, removeTask, toggleTaskCompletion, selectedProfile } =
    useTodoContext();
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = () => {
    if (selectedProfile && newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle,
        completed: false,
      };
      addTask(selectedProfile.id, day.date, newTask);
      setNewTaskTitle('');
    }
  };

  const handleRemoveTask = (taskId: string) => {
    if (selectedProfile) {
      removeTask(selectedProfile.id, day.date, taskId);
    }
  };

  const handleToggleTaskCompletion = (taskId: string) => {
    if (selectedProfile) {
      toggleTaskCompletion(selectedProfile.id, day.date, taskId);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>Задания на день {formatDate(day.date)}</h2>
          <button
            className={`${styles.btn} ${styles.btn_close}`}
            onClick={handleTaskModalClose}
          >
            Закрыть окно
          </button>
        </div>
        {selectedProfile && (
          <ul className={styles.task_list}>
            {day.tasks.map((task) => (
              <li key={task.id} className={styles.task}>
                <span>{task.title}</span>
                <div>
                  <label
                    className={styles.task_label}
                    htmlFor={`task-completion-${task.id}`}
                  >
                    Выполнено
                  </label>
                  <input
                    id={`task-completion-${task.id}`}
                    type="checkbox"
                    className={styles.task_checkbox}
                    checked={task.completed}
                    onChange={() => handleToggleTaskCompletion(task.id)}
                  />
                  <button
                    className={`${styles.btn} ${styles.btn_delete}`}
                    onClick={() => handleRemoveTask(task.id)}
                  >
                    Удалить
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <input
          type="text"
          className={styles.new_task_input}
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Новое задание"
        />
        <button
          className={`${styles.btn} ${styles.btn_add}`}
          onClick={handleAddTask}
        >
          Новое задание
        </button>
      </div>
    </div>
  );
};
