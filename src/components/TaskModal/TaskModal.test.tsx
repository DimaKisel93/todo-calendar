import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskModal } from './TaskModal';
import { Day } from '../../types/types';
import { TodoProvider } from '../../contexts/TodoContext';

const day: Day = {
  date: '2024-06-18',
  tasks: [
    { id: '1', title: 'Task 1', completed: false },
    { id: '2', title: 'Task 2', completed: true },
  ],
  isDayOff: false,
};

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<TodoProvider>{ui}</TodoProvider>);
};

describe('TaskModal component', () => {
  test('renders tasks', () => {
    renderWithProvider(
      <TaskModal
        day={day}
        handleTaskModalClose={() => {
          /* TODO: handle modal close */
        }}
      />,
    );

    expect(screen.getByText(/Task 1/)).toBeInTheDocument();
    expect(screen.getByText(/Task 2/)).toBeInTheDocument();
  });

  test('adds a new task', () => {
    renderWithProvider(
      <TaskModal
        day={day}
        handleTaskModalClose={() => {
          /* TODO: handle modal close */
        }}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText(/Новое задание/), {
      target: { value: 'New Task' },
    });
    fireEvent.click(screen.getByText(/Новое задание/));

    expect(screen.getByText(/New Task/)).toBeInTheDocument();
  });

  test('removes a task', () => {
    renderWithProvider(
      <TaskModal
        day={day}
        handleTaskModalClose={() => {
          /* TODO: handle modal close */
        }}
      />,
    );

    const removeButton =
      screen.getByText(/Task 1/)?.nextElementSibling?.nextElementSibling;
    if (removeButton) {
      fireEvent.click(removeButton);
      expect(screen.queryByText(/Task 1/)).not.toBeInTheDocument();
    }
  });

  test('toggles task completion', () => {
    renderWithProvider(
      <TaskModal
        day={day}
        handleTaskModalClose={() => {
          /* TODO: handle modal close */
        }}
      />,
    );

    const task1Checkbox = screen.getByLabelText(/Выполнено/);
    fireEvent.click(task1Checkbox);
    expect(task1Checkbox).toBeChecked();
  });

  test('closes modal on close button click', () => {
    const handleTaskModalClose = jest.fn();
    renderWithProvider(
      <TaskModal day={day} handleTaskModalClose={handleTaskModalClose} />,
    );

    fireEvent.click(screen.getByText(/Закрыть окно/));
    expect(handleTaskModalClose).toHaveBeenCalledTimes(1);
  });
});
