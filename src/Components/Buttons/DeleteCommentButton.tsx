import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteComment from '../UI/DeleteComment'; 

interface DeleteCommentButtonProps {
  commentId: number;
}

const DeleteCommentButton: React.FC<DeleteCommentButtonProps> = ({ commentId }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <IconButton
        aria-label="delete-comment"
        color="secondary"
        onClick={handleOpenDialog}
      >
        <DeleteIcon />
      </IconButton>

      {isDialogOpen && (
        <DeleteComment
          commentId={commentId}
          onDelete={() => {
            // Handle the comment deletion (e.g., update state, refetch comments)
            // You can implement this based on your specific use case
            console.log('Comment deleted');
          }}
          onClose={handleCloseDialog}
        />
      )}
    </>
  );
};

export default DeleteCommentButton;
