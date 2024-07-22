import { render, screen, fireEvent } from "@testing-library/react";
import { Day } from "./Day";
import { Day as DayType } from "../../types/types";
import { formatDate } from "../../utils/formatDate";
import styles from "./Day.module.scss";

describe("Day component", () => {
  const mockDay: DayType = {
    date: "2024-06-18",
    tasks: [],
    isDayOff: false,
  };

  const mockDayOff: DayType = {
    date: "2024-06-19",
    tasks: [],
    isDayOff: true,
  };

  const mockOnClick = jest.fn();

  test("renders the date correctly", () => {
    render(<Day day={mockDay} onClick={mockOnClick} />);

    expect(screen.getByText(formatDate(mockDay.date))).toBeInTheDocument();
  });

  test("applies day_off class when it is a day off", () => {
    render(<Day day={mockDayOff} onClick={mockOnClick} />);

    const dayElement = screen
      .getByText(formatDate(mockDayOff.date))
      .closest("article");
    expect(dayElement).toHaveClass(styles.day_off);
  });

  test("does not apply day_off class when it is not a day off", () => {
    render(<Day day={mockDay} onClick={mockOnClick} />);

    const dayElement = screen
      .getByText(formatDate(mockDay.date))
      .closest("article");
    expect(dayElement).not.toHaveClass(styles.day_off);
  });

  test("calls onClick when the day is clicked", () => {
    render(<Day day={mockDay} onClick={mockOnClick} />);

    const dayElement = screen
      .getByText(formatDate(mockDay.date))
      .closest("article");
    if (dayElement) {
      fireEvent.click(dayElement);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    }
  });
});
