import { render, screen, fireEvent } from '@testing-library/react';
import { Calendar } from './Calendar';
import { TodoProvider } from '../../contexts/TodoContext';
import { TodoState, Profile, Day } from '../../types/types';

const mockDays: Day[] = [
  { date: '2024-06-18', tasks: [], isDayOff: false },
  { date: '2024-06-19', tasks: [], isDayOff: true },
  { date: '2024-06-20', tasks: [], isDayOff: false },
  { date: '2024-06-21', tasks: [], isDayOff: false },
  { date: '2024-06-22', tasks: [], isDayOff: false },
  { date: '2024-06-23', tasks: [], isDayOff: true },
  { date: '2024-06-24', tasks: [], isDayOff: false },
  { date: '2024-06-25', tasks: [], isDayOff: true },
];

const mockProfile: Profile = {
  id: '1',
  name: 'Test Profile',
  days: mockDays,
};

const mockState: TodoState = {
  profiles: [mockProfile],
  selectedProfile: mockProfile,
};

const mockStateNoProfile: TodoState = {
  profiles: [mockProfile],
  selectedProfile: null,
};

const renderWithProvider = (state: TodoState) => {
  return render(
    <TodoProvider initialValue={state}>
      <Calendar />
    </TodoProvider>,
  );
};

describe('Calendar component', () => {
  test('renders "No days available" when no profile is selected', () => {
    renderWithProvider(mockStateNoProfile);

    expect(screen.getByText(/No days available/)).toBeInTheDocument();
  });

  test('renders days of the selected profile', () => {
    renderWithProvider(mockState);

    expect(screen.getByText(/18.06.2024/)).toBeInTheDocument();
    expect(screen.getByText(/19.06.2024/)).toBeInTheDocument();
  });

  test('navigates between weeks', () => {
    renderWithProvider(mockState);

    expect(screen.getByText(/18.06.2024/)).toBeInTheDocument();
    expect(screen.queryByText(/25.06.2024/)).not.toBeInTheDocument();

    const nextButton = screen.getByText(/Следующая неделя/);
    fireEvent.click(nextButton);

    expect(screen.getByText(/25.06.2024/)).toBeInTheDocument();
    expect(screen.queryByText(/18.06.2024/)).not.toBeInTheDocument();

    const prevButton = screen.getByText(/Предыдущая неделя/);
    fireEvent.click(prevButton);

    expect(screen.getByText(/18.06.2024/)).toBeInTheDocument();
    expect(screen.queryByText(/25.06.2024/)).not.toBeInTheDocument();
  });
});
