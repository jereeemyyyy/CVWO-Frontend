import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface DeleteCommentProps {
  commentId: number;
  onDelete: () => void;
  onClose: () => void;
  open: boolean;
}

const DeleteComment: React.FC<DeleteCommentProps> = ({ commentId, onDelete, onClose, open }) => {
  
  // Delete comment logic
  const handleDelete = async () => {
  
    try {
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        console.error('Authentication token not found');
        return;
      }

      const payload = JSON.parse(atob(authToken.split('.')[1]));

      const response = await fetch(`http://0.0.0.0:8082/deletecomment/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          user_id: payload.user_id,
        }),
      });

      if (response.ok) {
        // If deletion is successful, call the onDelete callback
        onDelete();
      } else {
        console.error('Error deleting comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // Close the dialog regardless of the deletion result
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Comment</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete this comment?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="primary" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteComment;
