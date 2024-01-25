import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';

interface UpdatePostProps {
  postId: number;
  currentContent: string;
  userId: number; // Add the user ID as a prop
  onUpdate: (postId: number, newContent: string) => void;
  onClose: () => void;
}

const UpdatePost: React.FC<UpdatePostProps> = ({ postId, currentContent, userId, onUpdate, onClose }) => {
  const [newContent, setNewContent] = useState(currentContent);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Additional logic can be added here if needed when the component mounts
  }, []);

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);

      // Check if the user ID matches the post creator's ID
      if (userId === 0/* Retrieve post creator's ID */) {
        // User is authorized to update the post
        // Make a request to the backend to update the post content
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
          console.error('Authentication token not found');
          return;
        }

        const response = await fetch(`http://0.0.0.0:8082/posts/${postId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            content: newContent,
          }),
        });

        if (response.ok) {
          // Call the onUpdate callback to update the UI or perform other actions
          onUpdate(postId, newContent);
          window.location.reload()
        } else {
          console.error('Failed to update post:', response.statusText);
          // Handle error or provide user feedback
        }
      } else {
        // User is not authorized to update the post
        console.error('User is not authorized to update this post');
        // Handle unauthorized update attempt
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsUpdating(false);
      onClose();
    }
  };

  const handleClose = () => {
    // Call the onClose callback to close the dialog
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Update Post</DialogTitle>
      <DialogContent>
        <TextField
          label="New Content"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        {/* Check if user is authorized before rendering the update button */}
        {userId === 0/* Retrieve post creator's ID */ && (
          <Button onClick={handleUpdate} disabled={isUpdating} color="primary">
            {isUpdating ? 'Updating...' : 'Update'}
          </Button>
        )}
        <Button onClick={handleClose} disabled={isUpdating} color="secondary">
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePost;
