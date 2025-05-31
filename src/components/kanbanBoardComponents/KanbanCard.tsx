// src/components/kanbanBoardComponents/KanbanCard.tsx
import { useDraggable } from '@dnd-kit/core';
import { Task, GetAllUsers } from '../../interfaces/kanban-board-types';
import { CSS } from '@dnd-kit/utilities';
import {
  Popover,
  Button,
  Modal,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useState } from 'react';
import { updateTaskStatusById } from '../../config/base-actions';
import '../../sections/KanbanBoard/KanbanBoardView.css';

interface Props {
  task: Task;
  onTasksUpdated: () => void;
  users: GetAllUsers[];
}

export default function KanbanCard({ task, onTasksUpdated, users }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.taskId,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [description, setDescription] = useState(task.description);
  const [selectedUserId, setSelectedUserId] = useState<number | ''>(task.userId ?? '');
  const isAdmin = sessionStorage.getItem('IsAdmin') === 'true';

  const handleClickCard = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    if (!isAdmin) return;
    setOpenModal(true);
    handleClosePopover();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setDescription(task.description);
    setSelectedUserId(task.userId ?? '');
  };

  const handleSave = async () => {
    const updatedTask = {
      ...task,
      description,
      userId: selectedUserId === '' ? null : selectedUserId,
    };
    try {
      await updateTaskStatusById(task.taskId, updatedTask);
      setOpenModal(false);
      onTasksUpdated();
    } catch (error) {
      alert('Erro ao atualizar tarefa.');
    }
  };

  return (
    <>
      <div
        ref={setNodeRef}
        className="kanban-card"
        style={style}
        {...listeners}
        {...attributes}
        onContextMenu={handleContextMenu}
      >
        <div>{task.description}</div>
      </div>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        {isAdmin ? (
          <Button onClick={handleOpenModal}>Alterar Card</Button>
        ) : (
          <Box sx={{ p: 2, color: 'gray' }}>Acesso restrito</Box>
        )}
      </Popover>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box className="modal-box" sx={{ bgcolor: 'white', padding: 3, borderRadius: 2 }}>
          <TextField
            label="Descrição"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="user-select-label">Atribuir a</InputLabel>
            <Select
              labelId="user-select-label"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value as number)}
              label="Atribuir a"
            >
              <MenuItem value="">Não atribuído</MenuItem>
              {users.map((user) => (
                <MenuItem key={user.userId} value={user.userId}>
                  {user.firstName + ' ' + user.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={handleSave} variant="contained" color="primary" sx={{ mr: 1 }}>
              Salvar
            </Button>
            <Button onClick={handleCloseModal} variant="outlined">
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
