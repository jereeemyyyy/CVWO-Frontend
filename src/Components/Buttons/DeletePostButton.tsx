import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import DeletePost from '../UI/DeletePost'; // Adjust the path based on your file structure

interface DeletePostButtonProps {
  postId: number;
  onDelete: () => void;
}

const DeletePostButton: React.FC<DeletePostButtonProps> = ({ postId, onDelete }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleClose = () => {
    setDeleteDialogOpen(false);
  };

  const handlePostDelete = async () => {
    // Implement your logic before calling onDelete
    console.log('Performing pre-delete actions');

    // You can choose to proceed with the deletion or not based on your logic

    // If you want to proceed, call onDelete to trigger the actual deletion
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
