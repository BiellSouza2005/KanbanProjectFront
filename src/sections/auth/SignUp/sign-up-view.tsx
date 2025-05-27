import { useState, useCallback } from 'react';
import './SignUpView.css';

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
import { UserRegister } from '../../../config/base-actions';
import { User } from '../../../interfaces/kanban-board-types';
import { useRouter } from '../../../router/hooks';
import axios from 'axios';

//import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function SignUpView() {

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGetStarted = useCallback(() => {
    router.push('/sign-in');
  }, [router]);


const handleSignUp = async (user: User) => {
  try {
    const response = await UserRegister(user);

    if (response.status === 200 || response.status === 201) {
      alert('Usuário cadastrado com sucesso!');
      router.push('/sign-in');
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data?.message || 'Erro ao cadastrar usuário.');
      console.log(user);
    } else {
      alert('Erro inesperado.');
    }
  }
};

const handleSubmit = () => {
  if (!firstName || !lastName || !email || !password) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  if (!email.includes('@')) {
    alert("Por favor, insira um email válido.");
    return;
  }

  handleSignUp({ firstName, lastName, email, password });
};


  const renderForm = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
      }}
    >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'row',
        gap: '15px',
      }}
    >
        <TextField
          fullWidth
          name="First name"
          type="text"
          label="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          sx={{ 
            mb: 3
          }}
          slotProps={{
            inputLabel: { shrink: true },
          }}
          required
        />

        <TextField
          fullWidth
          name="Last name"
          type="text"
          label="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          sx={{ 
            mb: 3
          }}
          slotProps={{
            inputLabel: { shrink: true },
          }}
          required
        />
    </Box>
      <TextField
        fullWidth
        name="email"
        label="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ 
          mb: 3
        }}
        slotProps={{
          inputLabel: { shrink: true },
        }}
        required
      />

      <TextField
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: (
              <InputAdornment position="end" >
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end"   
                  style={{
                          outline: 'none'
                        }}>
                  <Icon icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'}  ></Icon>
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 3 }}
        required
      />

      <Button
        fullWidth
        size="large"
        type="submit"
        color="info"
        variant="contained"
        onClick={handleSubmit}
      >
        Create account
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
            Get Started
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'grey',
            }}
          >
            Already have an account? 
            <Link variant="subtitle2" sx={{ ml: 0.5 }} onClick={handleGetStarted}>
              Get started
            </Link>
          </Typography>
        </Box>
        {renderForm}
      </Box>
    </>
  );
}
