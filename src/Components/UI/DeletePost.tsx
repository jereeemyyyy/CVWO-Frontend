import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button } from '@mui/material';

interface DeletePostProps {
  postId: number;
  onDelete: () => void;
  onClose: () => void;
}

const DeletePost: React.FC<DeletePostProps> = ({ postId, onDelete, onClose }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  // Delete Post logic
  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      //
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        console.error('Authentication token not found');
        return;
      }

      const response = await fetch(`http://0.0.0.0:8082/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        // Call the onDelete callback to update the UI or perform other actions
        onDelete();
      } else {
        console.error('Failed to delete post:', response.statusText);
        // Handle error or provide user feedback
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsDeleting(false);
      onClose();
      

    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Delete Post</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete this post?</p>
        <Button onClick={handleDelete} disabled={isDeleting} color="secondary">
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
        <Button onClick={onClose} disabled={isDeleting} color="primary">
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePost;
