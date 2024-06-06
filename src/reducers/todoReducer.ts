import { Profile, Action } from "../types/types";
import {
  SET_PROFILES,
  ADD_TASK,
  REMOVE_TASK,
  TOGGLE_TASK_COMPLETION,
} from "../constants/actionTypes";

const todoReducer = (state: Profile[], action: Action): Profile[] => {
  switch (action.type) {
    case SET_PROFILES:
      return action.profiles;

    case ADD_TASK: {
      return state.map((profile) => {
        if (profile.id !== action.profileId) return profile;
        return {
          ...profile,
          days: profile.days.map((day) => {
            if (day.date !== action.date) return day;
            return {
              ...day,
              tasks: [...day.tasks, action.task],
            };
          }),
        };
      });
    }

    case REMOVE_TASK: {
      return state.map((profile) => {
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
    }

    case TOGGLE_TASK_COMPLETION: {
      return state.map((profile) => {
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
    }

    default:
      return state;
  }
};

export default todoReducer;
