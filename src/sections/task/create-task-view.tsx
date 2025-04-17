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

//import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function CreateTaskView() {

  const router = useRouter();

  const handleCreateTask = useCallback(() => {
    router.push('/sign-in');
  }, [router]);


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
        onClick={handleCreateTask}
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
