import { useState, useCallback } from 'react';
import './CreateTaskView.css';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
//import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { Icon } from "@iconify/react";
//import { useNavigate } from 'react-router-dom';

import { useRouter } from '../../router/hooks';
import axios from 'axios';
import { TaskRegister } from '../../config/base-actions';
import { CreateTask } from '../../interfaces/kanban-board-types';

//import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function CreateTaskView() {

  const router = useRouter();
  const [description, setDescription] = useState('');

const handleCreateTask = useCallback(async (task: CreateTask) => {
  try {

    const response = await TaskRegister(task);

    if (response.status === 200 || response.status === 201) {
      alert('Tarefa criada com sucesso!');
      setDescription(''); // limpa o campo após sucesso
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data?.message || 'Erro ao criar tarefa.');
    } else {
      alert('Erro inesperado.');
    }
  }
}, [description]);

const handleSubmit = () => {


if (description.trim().split(/\s+/).length < 2) {
  alert("Por favor, insira uma descrição com pelo menos duas palavras.");
  return;
}

  handleCreateTask({ description });
};


  const renderForm = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
      }}
    >
      <TextField
        fullWidth
        name="task"
        label="Create task"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ 
          mb: 3
        }}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
          endAdornment: (
              <InputAdornment position="end" >
                  <Icon icon={'eva:checkmark-fill'}  ></Icon>
              </InputAdornment>
            ),
          },
        }}
      />
      <Button
        fullWidth
        size="large"
        type="submit"
        color="info"
        variant="contained"
        onClick={handleSubmit}
      >
        Create Task
      </Button>
    </Box>
  );

  return (
    <>
      <Box className="sign-in-container">
        <Box
          sx={{
            gap: 1.5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 5,
          }}
        >
          <Typography 
            variant="h5"           
            sx={{
                color: 'grey',
              }} 
          >
            Create Task
          </Typography>
        </Box>
        {renderForm}
      </Box>
    </>
  );
}
