import { useDroppable } from '@dnd-kit/core';
import { Task, ColumnType, GetAllUsers } from '../../interfaces/kanban-board-types';
import KanbanCard from './KanbanCard';
import '../../sections/KanbanBoard/KanbanBoardView.css'

interface Props {
  column: ColumnType;
  tasks: Task[];
  onTasksUpdated: () => void;
  users: GetAllUsers[];
}

export default function KanbanColumn({ column, tasks, onTasksUpdated, users}: Props) {
  const { setNodeRef } = useDroppable({
    id: column,
  });

  return (
    <div
      ref={setNodeRef}
      className="kanban-column"
    >
      <h3 style={{ textAlign: 'center' }}>{column}</h3>
      {tasks?.map((task) => (
        <KanbanCard key={task.taskId} task={task} onTasksUpdated={onTasksUpdated} users={users}/>
      ))}
    </div>
  );
}
