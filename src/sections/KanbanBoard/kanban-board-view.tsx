// src/components/kanban/KanbanBoard.tsx
import { useState } from 'react';
import './KanbanBoardView.css';
import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from '@dnd-kit/core';
import KanbanColumn from '../../components/kanbanBoardComponents/KanbanColumn';
import { Task, ColumnType } from '../../interfaces/kanban-board-types';
import { initialTasks } from './data';


const columns: ColumnType[] = ['TODO', 'DOING', 'DONE', 'TESTING', 'COMPLETED'];

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Record<ColumnType, Task[]>>(initialTasks as any);
  
  const findColumnOfTask = (taskId: string): ColumnType | null => {
    for (const col of columns) {
      if (tasks[col].some((t) => t.id === taskId)) return col;
    }
    return null;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const sourceColumn = findColumnOfTask(active.id as string);
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
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        {columns.map((col) => (
          <KanbanColumn key={col} column={col} tasks={tasks[col]} />
        ))}
      </div>
    </DndContext>
  );
}
