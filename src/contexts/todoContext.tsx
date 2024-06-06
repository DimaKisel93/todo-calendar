import { createContext, useReducer, useContext, ReactNode } from "react";
import { Profile, Task } from "../types/types";
import todoReducer from "../reducers/todoReducer";
import {
  SET_PROFILES,
  ADD_TASK,
  REMOVE_TASK,
  TOGGLE_TASK_COMPLETION,
} from "../constants/actionTypes";

interface TodoContextType {
  profiles: Profile[];
  addTask: (profileId: string, date: string, task: Task) => void;
  removeTask: (profileId: string, date: string, taskId: string) => void;
  toggleTaskCompletion: (
    profileId: string,
    date: string,
    taskId: string,
  ) => void;
  setProfiles: (profiles: Profile[]) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [profiles, dispatch] = useReducer(todoReducer, []);

  const addTask = (profileId: string, date: string, task: Task) => {
    dispatch({ type: ADD_TASK, profileId, date, task });
  };

  const removeTask = (profileId: string, date: string, taskId: string) => {
    dispatch({ type: REMOVE_TASK, profileId, date, taskId });
  };

  const toggleTaskCompletion = (
    profileId: string,
    date: string,
    taskId: string,
  ) => {
    dispatch({ type: TOGGLE_TASK_COMPLETION, profileId, date, taskId });
  };

  const setProfiles = (profiles: Profile[]) => {
    dispatch({ type: SET_PROFILES, profiles });
  };

  return (
    <TodoContext.Provider
      value={{
        profiles,
        addTask,
        removeTask,
        toggleTaskCompletion,
        setProfiles,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
