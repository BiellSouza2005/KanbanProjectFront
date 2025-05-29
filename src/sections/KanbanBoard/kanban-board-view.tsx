// src/components/kanban/KanbanBoard.tsx
import { useEffect, useState } from 'react';
import './KanbanBoardView.css';
import {
  DndContext,
  DragEndEvent,
} from '@dnd-kit/core';
import KanbanColumn from '../../components/kanbanBoardComponents/KanbanColumn';
import { Task, GetAllUsers, ColumnType } from '../../interfaces/kanban-board-types';
import { initialTasks } from './data';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { getAllUsers, getTasksByUserId } from '../../config/base-actions';
import { updateTaskStatusById } from '../../config/base-actions';

const columns: ColumnType[] = ['toDo', 'doing', 'testing', 'done', 'completed'];

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Record<ColumnType, Task[]>>(initialTasks as any);
  const [users, setUsers] = useState<GetAllUsers[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | ''>('');  

  const findColumnOfTask = (id: number): ColumnType | null => {
    for (const col of columns) {
      if (tasks[col].some((t) => t.taskId === id)) return col;
    }
    return null;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        console.log('Usuários carregados:', data);
        setUsers(data);
      } catch (err) {
        console.error('Erro ao buscar usuários:', err);
      }
    };

    fetchUsers();
  }, []);

useEffect(() => {
  const fetchTasks = async () => {
    try {
      const data = await getTasksByUserId(selectedUserId === '' ? undefined : selectedUserId);
      console.log('Tarefas carregadas:', data);

      const organizedTasks: Record<ColumnType, Task[]> = {
        toDo: [],
        doing: [],
        done: [],
        testing: [],
        completed: [],
      };

      for (const task of data) {
        if (task.toDo) organizedTasks.toDo.push(task);
        if (task.doing) organizedTasks.doing.push(task);
        if (task.done) organizedTasks.done.push(task);
        if (task.testing) organizedTasks.testing.push(task);
        if (task.completed) organizedTasks.completed.push(task);
      }

      setTasks(organizedTasks);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }
  };

  fetchTasks();
}, [selectedUserId]);



const handleDragEnd = async (event: DragEndEvent) => {
  const { active, over } = event;

  if (!over || active.id === over.id) return;

  const sourceColumn = findColumnOfTask(active.id as number);
  const targetColumn = over.id as ColumnType;

  if (!sourceColumn || sourceColumn === targetColumn) return;

  const taskToMove = tasks[sourceColumn].find((t) => t.taskId === active.id)!;

  const updatedTask: Task = {
    ...taskToMove,
    toDo: false,
    doing: false,
    done: false,
    testing: false,
    completed: false,
    [targetColumn]: true,
  };

  // Salva estado anterior para possível rollback
  setTasks((prev) => ({
    ...prev,
    [sourceColumn]: prev[sourceColumn].filter((t) => t.taskId !== active.id),
    [targetColumn]: [...prev[targetColumn], updatedTask],
  }));

  try {
    await updateTaskStatusById(taskToMove.taskId, updatedTask);
    console.log(`Tarefa ${active.id} movida para a coluna ${targetColumn}`);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);

    // Rollback visual
    setTasks((prev) => ({
      ...prev,
      [targetColumn]: prev[targetColumn].filter((t) => t.taskId !== active.id),
      [sourceColumn]: [...prev[sourceColumn], taskToMove],
    }));
    alert('Erro ao atualizar tarefa. Movimentação desfeita.');
  }
};

  return (
    <>
      <FormControl sx={{ m: 2, minWidth: 500 }}>
        <InputLabel
          id="user-select-label"
          sx={{
            color: 'white',
            '&.Mui-focused': {
              color: 'white',
            },
            '&:hover': {
              color: 'white',
            },
          }}
        >
          Filtrar por Usuário
        </InputLabel>
        <Select
          labelId="user-select-label"
          id="user-select"
          value={selectedUserId}
          label="Filtrar por Usuário"
          onChange={(e) => setSelectedUserId(e.target.value as number)}
            sx={{
  
                  color: 'white',
                  '& .MuiSelect-icon': {
                    color: 'white',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                }}
        >
          <MenuItem 
            value=""
            sx={{
                  backgroundColor: 'black',
                  color: 'white',
                  '&.Mui-selected': {
                    backgroundColor: 'black',
                    color: 'white',
                  },
                  '&.Mui-selected:hover': {
                    backgroundColor: 'white',
                    color: 'black',
                  },
                  '&:hover': {
                    backgroundColor: 'white',
                    color: 'black',
                  },
                }}
            >
            Tasks a serem atribuídas
          </MenuItem>
          {Array.isArray(users) && users.map((user) => (
            <MenuItem 
              key={user.userId} 
              value={user.userId}
              sx={{
                  backgroundColor: 'black',
                  color: 'white',
                  '&.Mui-selected': {
                    backgroundColor: 'black',
                    color: 'white',
                  },
                  '&.Mui-selected:hover': {
                    backgroundColor: 'white',
                    color: 'black',
                  },
                  '&:hover': {
                    backgroundColor: 'white',
                    color: 'black',
                  },
                }}
              >
              {user.firstName + " " + user.lastName + " - " + user.email}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <DndContext onDragEnd={handleDragEnd}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
          {columns.map((col) => (
            <KanbanColumn key={col} column={col} tasks={tasks[col]} />
          ))}
        </div>
      </DndContext>
    </>
  );
}
