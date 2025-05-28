// src/components/kanban/KanbanBoard.tsx
import { useEffect, useState } from 'react';
import './KanbanBoardView.css';
import {
  DndContext,
  DragEndEvent,
} from '@dnd-kit/core';
import KanbanColumn from '../../components/kanbanBoardComponents/KanbanColumn';
import { Task, ColumnType, GetAllUsers } from '../../interfaces/kanban-board-types';
import { initialTasks } from './data';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { getAllUsers } from '../../config/base-actions';

const columns: ColumnType[] = ['TODO', 'DOING', 'DONE', 'TESTING', 'COMPLETED'];

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Record<ColumnType, Task[]>>(initialTasks as any);
  const [users, setUsers] = useState<GetAllUsers[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | ''>('');  

  const findColumnOfTask = (id: number): ColumnType | null => {
    for (const col of columns) {
      if (tasks[col].some((t) => t.id === id)) return col;
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const sourceColumn = findColumnOfTask(active.id as number);
    const targetColumn = over.id as ColumnType;

    if (!sourceColumn || sourceColumn === targetColumn) return;

    const taskToMove = tasks[sourceColumn].find((t) => t.id === active.id)!;

    const updatedTask: Task = {
      ...taskToMove,
      TODO: false,
      DOING: false,
      DONE: false,
      TESTING: false,
      COMPLETED: false,
      [targetColumn]: true,
    };

    setTasks((prev) => ({
      ...prev,
      [sourceColumn]: prev[sourceColumn].filter((t) => t.id !== active.id),
      [targetColumn]: [...prev[targetColumn], updatedTask],
    }));

    console.log(`Tarefa ${active.id} movida para a coluna ${targetColumn}`);

  };

  return (
    <>
      <FormControl sx={{ m: 2, minWidth: 240 }}>
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
          <MenuItem value="">
            <em style={{ color: 'black' }}>Todos</em>
          </MenuItem>
          {Array.isArray(users) && users.map((user) => (
            <MenuItem 
              key={user.userId} 
              value={user.userId}
              sx={{
                  backgroundColor: 'white',
                  color: 'black',
                  '&.Mui-selected': {
                    backgroundColor: 'white',
                    color: 'black',
                  },
                  '&.Mui-selected:hover': {
                    backgroundColor: 'white',
                  },
                  '&:hover': {
                    backgroundColor: 'white',
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
