import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import LoginForm from './Loginform'; // Create LoginForm component

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLoginSuccess = () => {
    setLoginSuccess(true);
    onClose();
    // You may perform additional actions upon successful login
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        {loginSuccess ? (
          <Typography color="success.main">Login successful!</Typography>
        ) : (
          <LoginForm onSuccess={handleLoginSuccess} />
        )}

        <Button onClick={onClose}>Close</Button>
      </Box>
    </Modal>
  );
};

export default LoginModal;
