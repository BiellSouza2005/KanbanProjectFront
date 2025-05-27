import { useState, useCallback } from 'react';
import './SignInView.css';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { Icon } from "@iconify/react";
import {useAuth} from '../authContext';
import { useRouter } from '../../../router/hooks';
import { UserSignIn } from '../../../interfaces/kanban-board-types';
import { UserLogin } from '../../../config/base-actions';
import axios from 'axios';

// ----------------------------------------------------------------------

export function SignInView() {
  
  const router = useRouter()
  const { login } = useAuth();;
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSignIn = async (user: UserSignIn) => {
    try {
      const response = await UserLogin(user);
  
      if (response.status === 200 || response.status === 201) {
        login(response.data.token, response.data.user.email);

        NavigateSideBar();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || 'Erro ao fazer login.');
        console.log(user);
      } else {
        alert('Erro inesperado.');
      }
    }
  };

  const handleSubmit = () => {
    if (!email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
  
    if (!email.includes('@')) {
      alert("Por favor, insira um email válido.");
      return;
    }
  
    handleSignIn({email, password });
  };

  const NavigateSideBar = useCallback(() => {
    router.push('/sidebar');
  }, [router]);

  const handleGetStarted = useCallback(() => {
    router.push('/sign-up');
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
        name="email"
        type="email"
        label="Email address"
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

      <Link variant="body2" color="primary" sx={{ mb: 1.5 }}>
        Forgot password?
      </Link>

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
        type="button"
        color="info"
        variant="contained"
        onClick={handleSubmit}
      >
        Sign in
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
            Sign in
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'grey',
            }}
          >
            Don’t have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }}  onClick={handleGetStarted}>
              Get started
            </Link>
          </Typography>
        </Box>
        {renderForm}
      </Box>
    </>
  );
}
