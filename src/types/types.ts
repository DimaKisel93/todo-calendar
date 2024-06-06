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