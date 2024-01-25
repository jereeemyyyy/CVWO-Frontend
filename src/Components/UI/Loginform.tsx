import React, { useState } from 'react';
import { TextField, Button, Typography, Link, FormControl, FormLabel } from '@mui/material';
import RegisterForm from './RegisterForm';

interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send a request to your backend to authenticate the user
      const response = await fetch('http://0.0.0.0:8082/login', {
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
        // If login is successful, get the token from the response
        const { token } = await response.json();

        // Store the token in localStorage
        localStorage.setItem('authToken', token);
        // Call the onSuccess callback to update the UI or perform other actions
        onSuccess();
      } else {
        // Handle authentication failure, show an error message, etc.
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleToggleForm = () => {
    setIsRegistering((prev) => !prev)
  }

  return (
    <main>
      {isRegistering ? (
        <RegisterForm onSuccess={onSuccess} />
      ) : (
        <form onSubmit={handleSubmit}>
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
                <b>Welcome!</b>
              </Typography>
              <Typography variant="body2">Sign in to continue.</Typography>
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
              Log in
            </Button>
            <Typography variant="body2" sx={{ alignSelf: 'center' }}>
              Don't have an account?{' '}
              <Button size="small" variant="text" onClick={handleToggleForm}>
                Sign up
              </Button>
            </Typography>
          </FormControl>
        </form>
      )}
    </main>
  );
};

export default LoginForm;