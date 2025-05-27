// src/components/kanban/types.ts

export interface Task {
  id: number;
  description: string;
  TODO: boolean;
  DOING: boolean;
  DONE: boolean;
  TESTING: boolean;
  COMPLETED: boolean;
  userId: number | null;
}

export interface CreateTask {
    description: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserSignIn {
  email: string;
  password: string;
}
  
  export const columns = ['TODO', 'DOING', 'TESTING', 'DONE', 'COMPLETED'] as const;
  export type ColumnType = typeof columns[number];
  