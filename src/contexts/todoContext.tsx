import {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Day, Profile, Task, TodoContextType, TodoState } from "../types/types";
import todoReducer from "../reducers/todoReducer";
import { ACTION_TYPES } from "../constants/actionTypes";
import { mockProfiles } from "../mockData";
import { DataService } from "../api/dataService";
import { FetchHttpClient } from "../api/fetchHttpClient";
import { formatApiDate, getDayOfYear } from "../utils/formatDate";
import { DAYS_OFF } from "../constants/constants";

interface TodoProviderProps {
  children: ReactNode;
  initialValue?: TodoState;
}
export const initialState: TodoState = {
  profiles: [],
  selectedProfile: null,
};

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined,
);
const fetchHttpClient = new FetchHttpClient();
const dataService = new DataService(fetchHttpClient, "ru");

export const TodoProvider = ({
  children,
  initialValue = initialState,
}: TodoProviderProps) => {
  const [state, dispatch] = useReducer(todoReducer, initialValue);

  useEffect(() => {
    const fetchProfiles = async () => {
      const year = new Date().getFullYear();
      try {
        const dayOffDays = await dataService.getDayOffDays(year);

        const profilesWithHolidays = mockProfiles.map((profile) => {
          const daysWithHolidays: Day[] = profile.days.map((day) => {
            const formattedDate = formatApiDate(day.date);
            const dayIndex = getDayOfYear(new Date(formattedDate)) - 1;
            const isDayOff = DAYS_OFF.includes(dayOffDays[dayIndex]);
            return { ...day, isDayOff };
          });
          return { ...profile, days: daysWithHolidays };
        });

        dispatch({
          type: ACTION_TYPES.SET_PROFILES,
          profiles: profilesWithHolidays,
        });
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, []);

  const addTask = (profileId: string, date: string, task: Task) => {
    dispatch({ type: ACTION_TYPES.ADD_TASK, profileId, date, task });
  };

  const removeTask = (profileId: string, date: string, taskId: string) => {
    dispatch({ type: ACTION_TYPES.REMOVE_TASK, profileId, date, taskId });
  };

  const toggleTaskCompletion = (
    profileId: string,
    date: string,
    taskId: string,
  ) => {
    dispatch({
      type: ACTION_TYPES.TOGGLE_TASK_COMPLETION,
      profileId,
      date,
      taskId,
    });
  };

  const setProfiles = (profiles: Profile[]) => {
    dispatch({ type: ACTION_TYPES.SET_PROFILES, profiles });
  };

  const selectProfile = (profileId: string) => {
    dispatch({ type: ACTION_TYPES.SELECT_PROFILE, profileId });
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
