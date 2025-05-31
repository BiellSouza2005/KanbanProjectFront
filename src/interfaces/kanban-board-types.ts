// src/components/kanban/types.ts

export interface Task {
  taskId: number;
  description: string;
  dueDate: Date | null;
  toDo: boolean;
  doing: boolean;
  done: boolean;
  testing: boolean;
  completed: boolean;
  userId: number | null;
}

export interface CreateTask {
    description: string;
    dueDate: Date;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface GetAllUsers {
  userId: number;
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
  export type StatusColumnType = typeof columns[number];

  export const statusColumn = ['toDo', 'doing', 'testing', 'done', 'completed'] as const;
  export type ColumnType = typeof statusColumn[number];
  