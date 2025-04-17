import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../../interfaces/kanban-board-types';
import '../../sections/KanbanBoard/KanbanBoardView.css'

interface Props {
  task: Task;
}

export default function KanbanCard({ task }: Props) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
      id: task.id,
    });
  
    const style = {
        transform: CSS.Transform.toString(transform),
        
    };
  
    return (
      <div ref={setNodeRef} className="kanban-card" style={style} {...listeners} {...attributes}>
        {task.description}
      </div>
    );
  }
