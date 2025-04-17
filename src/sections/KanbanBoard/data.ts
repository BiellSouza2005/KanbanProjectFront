import { Task } from '../../interfaces/kanban-board-types'

export const initialTasks: Record<string, Task[]> = {
  TODO: [
    {
      id: '1',
      taskId: 1,
      description: 'Criar estrutura inicial',
      TODO: true,
      DOING: false,
      DONE: false,
      TESTING: false,
      COMPLETED: false,
      userId: 101,
    },
  ],
  DOING: [
    {
      id: '2',
      taskId: 2,
      description: 'Implementar autenticação',
      TODO: false,
      DOING: true,
      DONE: false,
      TESTING: false,
      COMPLETED: false,
      userId: 102,
    },
  ],
  DONE: [],
  TESTING: [],
  COMPLETED: [],
};
