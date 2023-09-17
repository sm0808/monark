import React, { useState } from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import './login.css';

import config from '../../config/config';

interface LoginProps {
  onLogin: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLoginClick = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
          const data = await response.json();
          const token = data.token;
          
          // Save the token in the application state
          onLogin(token);
      } else {
          // Handle authentication error here
          console.error('Authentication failed');
      }
    } catch (error) {
        // Handle network or other errors
        console.error('An error occurred', error);
    }
  };

  return (
    <Container maxWidth="xs" className='loginContainer' data-testid="login-container">
      <CssBaseline />
      <AppBar position="static" color="transparent">
        <Toolbar className='appToolbar'>
          <Typography variant="h6">Login</Typography>
        </Toolbar>
      </AppBar>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="standard"
            inputProps={{
              'data-testid': 'email-input',
            }}
            InputProps={{ className: 'textInput' }}
            name="email"
            label="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="standard"
            inputProps={{
              'data-testid': 'password-input',
            }}
            InputProps={{ className: 'textInput' }}
            name="password"
            label="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" fullWidth variant="contained" data-testid='submit-button' color="primary" onClick={handleLoginClick}>
            Login
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
