import { Action, TodoState } from "../types/types";
import {
  SET_PROFILES,
  ADD_TASK,
  REMOVE_TASK,
  TOGGLE_TASK_COMPLETION,
  SELECT_PROFILE,
} from "../constants/actionTypes";

const todoReducer = (state: TodoState, action: Action): TodoState => {
  switch (action.type) {
    case SET_PROFILES:
      return { ...state, profiles: action.profiles || state.profiles };

    case ADD_TASK: {
      const updatedProfiles = state.profiles.map((profile) => {
        if (profile.id !== action.profileId) return profile;
        return {
          ...profile,
          days: profile.days.map((day) => {
            if (day.date !== action.date) return day;
            return {
              ...day,
              tasks: action.task ? [...day.tasks, action.task] : [...day.tasks],
            };
          }),
        };
      });
      return { ...state, profiles: updatedProfiles };
    }

    case REMOVE_TASK: {
      const updatedProfiles = state.profiles.map((profile) => {
        if (profile.id !== action.profileId) return profile;
        return {
          ...profile,
          days: profile.days.map((day) => {
            if (day.date !== action.date) return day;
            return {
              ...day,
              tasks: day.tasks.filter((task) => task.id !== action.taskId),
            };
          }),
        };
      });
      return { ...state, profiles: updatedProfiles };
    }

    case TOGGLE_TASK_COMPLETION: {
      const updatedProfiles = state.profiles.map((profile) => {
        if (profile.id !== action.profileId) return profile;
        return {
          ...profile,
          days: profile.days.map((day) => {
            if (day.date !== action.date) return day;
            return {
              ...day,
              tasks: day.tasks.map((task) => {
                if (task.id !== action.taskId) return task;
                return { ...task, completed: !task.completed };
              }),
            };
          }),
        };
      });
      return { ...state, profiles: updatedProfiles };
    }

    case SELECT_PROFILE: {
      const selectedProfile =
        state.profiles.find((profile) => profile.id === action.profileId) ||
        null;
      return { ...state, selectedProfile };
    }

    default:
      return state;
  }
};

export default todoReducer;
