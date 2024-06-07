import { Profile } from "./types/types";

export const mockProfiles: Profile[] = [
  {
    id: "1",
    name: "Ivan",
    days: [
      {
        date: "2024-06-01T00:00:00.000Z",
        tasks: [
          { id: "1", title: "Task 1", completed: false },
          { id: "2", title: "Task 2", completed: true },
        ],
        isDayOff: false,
      },
      {
        date: "2024-06-02T00:00:00.000Z",
        tasks: [
          { id: "3", title: "Task 3", completed: true },
          { id: "4", title: "Task 4", completed: false },
        ],
        isDayOff: true,
      },
      {
        date: "2024-06-03T00:00:00.000Z",
        tasks: [
          { id: "5", title: "Task 5", completed: false },
          { id: "6", title: "Task 6", completed: true },
        ],
        isDayOff: false,
      },
      {
        date: "2024-06-04T00:00:00.000Z",
        tasks: [
          { id: "7", title: "Task 7", completed: true },
          { id: "8", title: "Task 8", completed: false },
        ],
        isDayOff: false,
      },
      {
        date: "2024-06-05T00:00:00.000Z",
        tasks: [
          { id: "9", title: "Task 9", completed: false },
          { id: "10", title: "Task 10", completed: true },
        ],
        isDayOff: false,
      },
      {
        date: "2024-06-06T00:00:00.000Z",
        tasks: [
          { id: "11", title: "Task 11", completed: true },
          { id: "12", title: "Task 12", completed: false },
        ],
        isDayOff: false,
      },
      {
        date: "2024-06-07T00:00:00.000Z",
        tasks: [
          { id: "13", title: "Task 13", completed: false },
          { id: "14", title: "Task 14", completed: true },
        ],
        isDayOff: false,
      },
      {
        date: "2024-06-08T00:00:00.000Z",
        tasks: [
          { id: "15", title: "Task 15", completed: true },
          { id: "16", title: "Task 16", completed: false },
        ],
        isDayOff: true,
      },
      {
        date: "2024-06-09T00:00:00.000Z",
        tasks: [
          { id: "17", title: "Task 17", completed: false },
          { id: "18", title: "Task 18", completed: true },
        ],
        isDayOff: false,
      },
      {
        date: "2024-06-10T00:00:00.000Z",
        tasks: [
          { id: "19", title: "Task 19", completed: true },
          { id: "20", title: "Task 20", completed: false },
        ],
        isDayOff: false,
      },
    ],
  },
];
