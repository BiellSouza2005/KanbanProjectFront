import { Task } from '../../interfaces/kanban-board-types'

export const initialTasks: Record<string, Task[]> = {
  TODO: [
    {
      taskId: 1,
      description: 'Criar estrutura inicial',
      toDo: true,
      doing: false,
      done: false,
      testing: false,
      completed: false,
      userId: null,
    },
  ],
  DOING: [
    {
      taskId: 2,
      description: 'Implementar autenticação',
      toDo: false,
      doing: true,
      done: false,
      testing: false,
      completed: false,
      userId: null,
    },
  ],
  DONE: [],
  TESTING: [],
  COMPLETED: [],
};
