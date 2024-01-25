// RegisterForm.tsx

import React, { useState } from 'react';
import { TextField, Button, Typography, FormControl, FormLabel } from '@mui/material';

interface RegisterFormProps {
  onSuccess: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    try {
      // Send a request to your backend to register the user
      const response = await fetch('http://0.0.0.0:8082/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password_hash: password,
        }),
      });

      if (response.ok) {
        // If registration is successful, proceed with login
        const loginResponse = await fetch('http://0.0.0.0:8082/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password_hash: password,
          }),
        });

        if (loginResponse.ok) {
          // If login is successful, get the token from the response
          const { token } = await loginResponse.json();

          // Store the token in localStorage
          localStorage.setItem('authToken', token);

          // Call the onSuccess callback to update the UI or perform other actions
          onSuccess();

          window.location.reload()
        } else {
          // Handle login failure, show an error message, etc.
          console.error('Login after registration failed');
        }
      } else {
        // Handle registration failure, show an error message, etc.
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleRegistration(); }}>
      <FormControl
        sx={{
          width: '300px',
          mx: 'auto',
          my: 0,
          py: 0,
          px: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <div>
          <Typography variant="h4" component="h1">
            <b>Sign Up</b>
          </Typography>
          <Typography variant="body2">Create an account to get started.</Typography>
        </div>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <TextField
            name="username"
            type="text"
            placeholder="Your username"
            fullWidth
            variant="outlined"
            margin="dense"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <TextField
            name="password"
            type="password"
            placeholder="Your password"
            fullWidth
            variant="outlined"
            margin="dense"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>
          Sign up
        </Button>
      </FormControl>
    </form>
  );
};

export default RegisterForm;
