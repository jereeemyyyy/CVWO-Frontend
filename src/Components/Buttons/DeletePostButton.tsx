import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import DeletePost from '../UI/DeletePost'; // Adjust the path based on your file structure

interface DeletePostButtonProps {
  postId: number;
  onDelete: () => void;
}

const DeletePostButton: React.FC<DeletePostButtonProps> = ({ postId, onDelete }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Delete Button logic
  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);

  };

  // Close dialog logic
  const handleClose = () => {
    setDeleteDialogOpen(false);
  };

  // Delete post logic
  const handlePostDelete = async () => {
    console.log('Performing pre-delete actions');

    // Triggering actual deletion
    onDelete();

    // Close the dialog
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" color="secondary" onClick={handleDeleteClick}>
        Delete Post
      </Button>

      {/* Delete Post Dialog */}
      {deleteDialogOpen && (
        <DeletePost postId={postId} onDelete={handlePostDelete} onClose={handleClose} />
      )}
    </>
  );
};

export default DeletePostButton;
