// src/components/kanban/TaskCard.tsx
import { useDraggable } from '@dnd-kit/core';

interface TaskCardProps {
  id: string;
  title: string;
}

const TaskCard = ({ id, title }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="kanban-card"
    >
      {title}
    </div>
  );
};

export default TaskCard;
