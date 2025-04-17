// src/components/kanban/types.ts

export interface Task {
  id: string;
  taskId: number;
  description: string;
  TODO: boolean;
  DOING: boolean;
  DONE: boolean;
  TESTING: boolean;
  COMPLETED: boolean;
  userId: number;
}

  
  export const columns = ['TODO', 'DOING', 'TESTING', 'DONE', 'COMPLETED'] as const;
  export type ColumnType = typeof columns[number];
  