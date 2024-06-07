import {
  SET_PROFILES,
  ADD_TASK,
  REMOVE_TASK,
  TOGGLE_TASK_COMPLETION,
  SELECT_PROFILE,
} from "../constants/actionTypes";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface Day {
  date: string;
  isDayOff: boolean;
  tasks: Task[];
}

export interface Profile {
  id: string;
  name: string;
  days: Day[];
}

export interface TodoState {
  profiles: Profile[];
  selectedProfile: Profile | null;
}

export interface TodoContextType extends TodoState {
  addTask: (profileId: string, date: string, task: Task) => void;
  removeTask: (profileId: string, date: string, taskId: string) => void;
  toggleTaskCompletion: (
    profileId: string,
    date: string,
    taskId: string,
  ) => void;
  setProfiles: (profiles: Profile[]) => void;
  selectProfile: (profileId: string) => void;
  dispatch: React.Dispatch<Action>;
}

type SetProfilesAction = {
  type: typeof SET_PROFILES;
  profiles: Profile[];
};

type AddTaskAction = {
  type: typeof ADD_TASK;
  profileId: string;
  date: string;
  task: Task;
};

type RemoveTaskAction = {
  type: typeof REMOVE_TASK;
  profileId: string;
  date: string;
  taskId: string;
};

type ToggleTaskCompletionAction = {
  type: typeof TOGGLE_TASK_COMPLETION;
  profileId: string;
  date: string;
  taskId: string;
};

type SelectProfileAction = {
  type: typeof SELECT_PROFILE;
  profileId: string;
};

export type Action =
  | SetProfilesAction
  | AddTaskAction
  | RemoveTaskAction
  | ToggleTaskCompletionAction
  | SelectProfileAction;
