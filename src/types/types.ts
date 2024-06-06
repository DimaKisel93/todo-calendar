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

export type Action =
  | { type: "SET_PROFILES"; profiles: Profile[] }
  | { type: "ADD_TASK"; profileId: string; date: string; task: Task }
  | { type: "REMOVE_TASK"; profileId: string; date: string; taskId: string }
  | {
      type: "TOGGLE_TASK_COMPLETION";
      profileId: string;
      date: string;
      taskId: string;
    };
