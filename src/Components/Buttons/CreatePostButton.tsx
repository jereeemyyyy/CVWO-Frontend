import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

interface CreatePostButtonProps {
  onCreatePost: (title: string, content: string) => void;
}

const CreatePostButton: React.FC<CreatePostButtonProps> = ({ onCreatePost }) => {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  // Retrive the JWT token from localstorage
  const authToken = localStorage.getItem('authToken');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreatePost = async () => {
    try {
      
      if (!authToken) {
        console.error('Authentication token not found');
        return;
      }

      const payload = JSON.parse(atob(authToken.split('.')[1]));
      
      // Make a request to the backend to create a new post
      const response = await fetch('https://cvwo-backend-web-services.onrender.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          title: title,
          content: content,
          user_id: payload.user_id,
        }),
      });
     
      if (response.ok) {
        // Notify the parent component about the new post
        onCreatePost(title, content);
        handleClose();
        window.location.reload();
      } else {
        console.error('Failed to create post:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {(authToken &&<Button variant="contained" color="primary" onClick={handleOpen}>
        Create Post
      </Button> )}

       <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a New Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Content"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreatePost} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog> 
    </div>
  );
};

export default CreatePostButton;
