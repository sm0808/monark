import React, { useEffect, useState } from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  CssBaseline,
  Grid,
  TextField,
  FormControlLabel,
  Avatar,
  Snackbar,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './profile.css';

import config from '../../config/config';

interface ProfileProps {
    token: string | null;
    onLogout: () => void;
  }

const Profile: React.FC<ProfileProps> = ({ token, onLogout }) => {
  const abortController = new AbortController();
  const signal = abortController.signal;

  const [open, setOpen] = React.useState(false);

  const [formData, setFormData] = useState({
        email          : "",   
        first_name     : '',
        last_name      : '',
        role           : '',
        industry       : '',
        city           : "", 
        state          : "",   
        country        : "",   
        postcode       : "",   
        phone          : "",   
        public_profile : 0 
    });

  useEffect(() => {
    fetchProfileData();
  }, [token]);

  const handleLogoutClick = () => {
    // Call the logout function to log the user out
    onLogout();
  };
  
  // Custom Switch Style
  const CustomSwitch = styled((props: SwitchProps) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 22,
            height: 22,
        },
        '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
        },
  }));
  
  // Fetch Profile Data
  const fetchProfileData = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      if (response.ok) {
          const data = await response.json();
          
          setFormData(data);
      } else {
          // Handle API error here
          console.error('Error fetching profile data');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('An error occurred', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    setFormData((prevFormData) => {
        const updatedFormData = { ...prevFormData, [name]: name !== 'public_profile' ? value : formData.public_profile ? 0 : 1 };
        handleUpdate(updatedFormData);
        return updatedFormData;
    });
  };

  const handleUpdate = (data: any) => {
    // Cancel the previous request (if any)
    // abortController.abort();

    fetch(`${config.apiUrl}/profile`, {
      method: 'PUT',
      headers: {
        'Authorization' : `Bearer ${token}`, 
        'Content-Type'  : 'application/json',
      },
      body: JSON.stringify(data),
      signal: signal,
    })
      .then((response) => {
        if (response.ok) {
          // Handle success response here
          setOpen(true);
        } else {
          // Handle error response here
          console.error('Update failed');
        }
      })
      .catch((error) => {
        // Handle network error here
        console.error('Network error', error);
      });
  };

  return (
    <Container maxWidth="xs" className='profileContainer'>
      <CssBaseline />
      <AppBar position="static" color="transparent">
        <Toolbar className='appToolbar'>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="back"
                onClick={handleLogoutClick}
            >
                <ArrowBackIcon />
          </IconButton>

          <Typography variant="h6">Profile</Typography>

          <Avatar 
                src="https://mui.com/static/images/avatar/2.jpg" 
                sx={{ width: 40, height: 40 }}
            />
        </Toolbar>
      </AppBar>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography align="left" variant="h5">Edit</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography align="left">Picture:</Typography>
        </Grid>
        <Grid container item xs={6} justifyContent="flex-end" className='avaContainer'>
          <Avatar 
                src="https://mui.com/static/images/avatar/2.jpg" 
                sx={{ width: 56, height: 56 }}
            />
        </Grid>

        <Grid item xs={6}>
          <Typography align="left">Email:</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            variant="standard"
            InputProps={{ className: 'textInput' }}
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={6}>
          <Typography align="left">Role:</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            variant="standard"
            InputProps={{ className: 'textInput' }}
            name="role"
            value={formData.role}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={6}>
          <Typography align="left">Industry:</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            variant="standard"
            InputProps={{ className: 'textInput' }}
            name="industry"
            value={formData.industry}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={6}>
          <Typography align="left">Do you want to make your profile public?</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'right' }}>
          <FormControlLabel
            control={
                <CustomSwitch 
                    sx={{ m: 1 }} 
                    checked={formData.public_profile == 1 ? true : false}
                    name="public_profile"
                    onChange={handleInputChange}
                    color="primary"
                />
            }
            label=""
            style={{ marginRight: 0 }}
          />
        </Grid>
      </Grid>

      <Snackbar 
            open={open} 
            autoHideDuration={3000}
            onClose={() => {setOpen(false)}}>
        <Alert severity="success" sx={{ width: '100%' }}>
            Profile Updated Successfully!
        </Alert>
     </Snackbar>
    </Container>
  );
};

export default Profile;
