import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Week } from "./Week";
import { Day as DayType } from "../../types/types";

const days: DayType[] = [
  {
    date: "2024-06-18",
    tasks: [{ id: "1", title: "Task 1", completed: false }],
    isDayOff: false,
  },
  {
    date: "2024-06-19",
    tasks: [{ id: "2", title: "Task 2", completed: true }],
    isDayOff: true,
  },
];

describe("Week component", () => {
  test("renders days", () => {
    render(<Week days={days} />);

    expect(screen.getByText(/18.06.2024/)).toBeInTheDocument();
    expect(screen.getByText(/19.06.2024/)).toBeInTheDocument();
  });

  test("opens modal on day click", () => {
    render(<Week days={days} />);

    fireEvent.click(screen.getByText(/18.06.2024/));
    expect(screen.getByText(/Задания на день/)).toBeInTheDocument();
  });

  test("closes modal on close button click", () => {
    render(<Week days={days} />);

    fireEvent.click(screen.getByText(/18.06.2024/));
    expect(screen.getByText(/Задания на день/)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Закрыть окно/));
    expect(screen.queryByText(/Задания на день/)).not.toBeInTheDocument();
  });

  test("renders tasks in the modal", () => {
    render(<Week days={days} />);

    fireEvent.click(screen.getByText(/18.06.2024/));
    expect(screen.getByText(/Task 1/)).toBeInTheDocument();
  });

  test("updates selected day when new day is clicked", () => {
    render(<Week days={days} />);

    fireEvent.click(screen.getByText(/18.06.2024/));
    expect(screen.getByText(/Task 1/)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Закрыть окно/));
    fireEvent.click(screen.getByText(/19.06.2024/));
    expect(screen.getByText(/Task 2/)).toBeInTheDocument();
  });

  test('displays "No days available for this week" when no days are provided', () => {
    render(<Week days={[]} />);
    expect(
      screen.getByText(/No days available for this week/),
    ).toBeInTheDocument();
  });
});
