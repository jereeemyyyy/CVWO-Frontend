import React, { useState } from 'react';
import { Typography, Button, Dialog, DialogTitle, DialogContent, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import UpdatePost from '../UI/UpdatePost';

interface UpdatePostButtonProps {
  postId: number;
  currentContent: string;
  onUpdate: () => void;
}

const UpdatePostButton: React.FC<UpdatePostButtonProps> = ({ postId, currentContent, onUpdate }) => {
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [content, setContent] = useState('');

  const handleUpdateClick = () => {
    setContent('');
    setUpdateDialogOpen(true);
  };

  const handleClose = () => {
    setUpdateDialogOpen(false);
  };

  return (
    <>
      <IconButton color="primary" aria-label="edit" onClick={handleUpdateClick}>
        <EditIcon />
        <Typography variant="caption" color="text.secondary">
            Edit
        </Typography>
      </IconButton>

      {/* Update Post Dialog */}
      {updateDialogOpen && (
        <Dialog open={updateDialogOpen} onClose={handleClose}>
          <DialogTitle>Update Post</DialogTitle>
          <DialogContent>
            <UpdatePost
              postId={postId}
              currentContent={currentContent}
              userId={0}
              onUpdate={() => {
                onUpdate();
                handleClose();
              }}
              onClose={handleClose}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default UpdatePostButton;
