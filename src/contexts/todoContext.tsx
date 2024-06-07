import {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Profile, Task, TodoContextType, TodoState } from "../types/types";
import todoReducer from "../reducers/todoReducer";
import {
  SET_PROFILES,
  ADD_TASK,
  REMOVE_TASK,
  TOGGLE_TASK_COMPLETION,
  SELECT_PROFILE,
} from "../constants/actionTypes";
import { mockProfiles } from "../mockData";

interface TodoProviderProps {
  children: ReactNode;
}
export const initialState: TodoState = {
  profiles: [],
  selectedProfile: null,
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    dispatch({ type: SET_PROFILES, profiles: mockProfiles });
  }, []);

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

  const selectProfile = (profileId: string) => {
    dispatch({ type: SELECT_PROFILE, profileId });
  };

  return (
    <TodoContext.Provider
      value={{
        profiles: state.profiles,
        selectedProfile: state.selectedProfile,
        addTask,
        removeTask,
        toggleTaskCompletion,
        setProfiles,
        selectProfile,
        dispatch,
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
