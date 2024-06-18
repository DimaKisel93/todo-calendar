import { Action, TodoState } from '../types/types';
import { ACTION_TYPES } from '../constants/actionTypes';
import { findAndUpdateProfile, findAndUpdateDay } from '../utils/updateHelpers';

const todoReducer = (state: TodoState, action: Action): TodoState => {
  switch (action.type) {
    case ACTION_TYPES.SET_PROFILES:
      return { ...state, profiles: action.profiles || state.profiles };

    case ACTION_TYPES.ADD_TASK: {
      const updatedProfiles = findAndUpdateProfile(
        state.profiles,
        action.profileId,
        (profile) => ({
          ...profile,
          days: findAndUpdateDay(profile.days, action.date, (day) => ({
            ...day,
            tasks: action.task ? [...day.tasks, action.task] : [...day.tasks],
          })),
        }),
      );
      const selectedProfile =
        updatedProfiles.find(
          (profile) => profile.id === state.selectedProfile?.id,
        ) || null;
      return { ...state, profiles: updatedProfiles, selectedProfile };
    }

    case ACTION_TYPES.REMOVE_TASK: {
      const updatedProfiles = findAndUpdateProfile(
        state.profiles,
        action.profileId,
        (profile) => ({
          ...profile,
          days: findAndUpdateDay(profile.days, action.date, (day) => ({
            ...day,
            tasks: day.tasks.filter((task) => task.id !== action.taskId),
          })),
        }),
      );
      const selectedProfile =
        updatedProfiles.find(
          (profile) => profile.id === state.selectedProfile?.id,
        ) || null;
      return { ...state, profiles: updatedProfiles, selectedProfile };
    }

    case ACTION_TYPES.TOGGLE_TASK_COMPLETION: {
      const updatedProfiles = findAndUpdateProfile(
        state.profiles,
        action.profileId,
        (profile) => ({
          ...profile,
          days: findAndUpdateDay(profile.days, action.date, (day) => ({
            ...day,
            tasks: day.tasks.map((task) =>
              task.id === action.taskId
                ? { ...task, completed: !task.completed }
                : task,
            ),
          })),
        }),
      );
      const selectedProfile =
        updatedProfiles.find(
          (profile) => profile.id === state.selectedProfile?.id,
        ) || null;
      return { ...state, profiles: updatedProfiles, selectedProfile };
    }

    case ACTION_TYPES.SELECT_PROFILE: {
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
