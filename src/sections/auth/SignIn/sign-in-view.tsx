import { useState, useCallback } from 'react';
import './SignInView.css';

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

import { useRouter } from '../../../router/hooks';

//import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function SignInView() {

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = useCallback(() => {
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
        label="Email address"
        sx={{ 
          mb: 3
        }}
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />

      <Link variant="body2" color="primary" sx={{ mb: 1.5 }}>
        Forgot password?
      </Link>

      <TextField
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
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
      />

      <Button
        fullWidth
        size="large"
        type="submit"
        color="info"
        variant="contained"
        onClick={handleSignIn}
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
