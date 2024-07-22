import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProfileSelector } from "./ProfileSelect";
import { TodoContext } from "../../contexts/TodoContext";

const mockProfiles = [
  { id: "1", name: "User 1", days: [] },
  { id: "2", name: "User 2", days: [] },
];

const mockTodoContext = {
  profiles: mockProfiles,
  selectedProfile: null,
  selectProfile: jest.fn(),
  addTask: jest.fn(),
  removeTask: jest.fn(),
  toggleTaskCompletion: jest.fn(),
  setProfiles: jest.fn(),
  dispatch: jest.fn(),
};

const renderWithProvider = (ui: React.ReactElement) => {
  return render(
    <TodoContext.Provider value={mockTodoContext}>{ui}</TodoContext.Provider>,
  );
};

describe("ProfileSelector component", () => {
  test("renders profile selector with options", () => {
    renderWithProvider(<ProfileSelector />);

    expect(screen.getByLabelText(/выбрать пользователя/i)).toBeInTheDocument();
    expect(screen.getByText("User 1")).toBeInTheDocument();
    expect(screen.getByText("User 2")).toBeInTheDocument();
  });

  test("selects the first profile by default if none is selected", () => {
    renderWithProvider(<ProfileSelector />);

    expect(mockTodoContext.selectProfile).toHaveBeenCalledWith("1");
  });

  test("calls selectProfile when a different profile is selected", () => {
    renderWithProvider(<ProfileSelector />);

    fireEvent.change(screen.getByLabelText(/выбрать пользователя/i), {
      target: { value: "2" },
    });

    expect(mockTodoContext.selectProfile).toHaveBeenCalledWith("2");
  });
});
