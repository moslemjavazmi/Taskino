import { create } from "zustand";
import * as taskApi from "../api/task.api";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: string;
  createdAt: string;
};

type TaskStore = {
  loading: boolean;
  tasks: Task[];

  createTask: (payload: taskApi.CreateTaskPayload) => Promise<void>;
};

export const useTaskStore = create<TaskStore>((set) => ({
  loading: false,
  tasks: [],

  createTask: async (payload) => {
    try {
      set({ loading: true });

      const task = await taskApi.createTask(payload);

      set((state) => ({
        tasks: [task, ...state.tasks],
      }));
    } finally {
      set({ loading: false });
    }
  },
}));