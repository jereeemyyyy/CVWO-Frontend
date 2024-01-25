import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Paper, Box } from '@mui/material';
import DeleteComment from './DeleteComment';

interface Comment {
  comment_id: number;
  comment_content: string;
  user_id: number;
  username: string;
  created_at: string;
}

interface CommentWallProps {
  post_id: number;
  onClose: () => void;
}

const CommentWall: React.FC<CommentWallProps> = ({ post_id, onClose }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const authToken = localStorage.getItem('authToken');
  const payload = authToken ? JSON.parse(atob(authToken.split('.')[1])) : null;

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://0.0.0.0:8082/getcommentsbypostid/${post_id}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        console.error(`Error fetching comments for post ID ${post_id}:`, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Fetch comments when the component mounts
    fetchComments();
  }, [post_id]);

  const handleSubmitComment = async () => {
    try {
      

        if (!authToken) {
          console.error('Authentication token not found');
          return;
        }


      const response = await fetch(`http://0.0.0.0:8082/createcomment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ 
          comment_content: newComment,
          user_id: payload.user_id,
          post_id: post_id
         }),
      });

      if (response.ok) {
        // If the comment is successfully submitted, fetch the updated comments
        await fetchComments();
        setNewComment(''); // Clear the input field
      } else {
        console.error('Error submitting comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteComment = (commentId: number) => {
    // Set the selected comment for deletion and open the dialog
    setSelectedCommentId(commentId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    // Logic to delete the comment and update the UI
    try {
      // Perform any additional logic before deletion if needed

      // Close the delete confirmation dialog
      setDeleteDialogOpen(false);

      // Fetch the updated comments
      await fetchComments();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container style={{ marginTop: '50px' }}>
      <Typography variant="h6">Comments</Typography>
      {comments && comments.map((comment) => (
        <div key={comment.comment_id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
            <Typography variant="body1">{comment.comment_content}</Typography>
            <Typography variant="caption" color="text.secondary">
            Posted by {comment.username} at {comment.created_at}
            </Typography>
            {comment.user_id === payload.user_id && (  // Show delete button only for the comment creator
              <Button onClick={() => handleDeleteComment(comment.comment_id)} variant="outlined" color="secondary">
                Delete Comment
              </Button>
            )}
        </div>
    ))}

      {/* Add a form to submit new comments */}
      <form onSubmit={(e) => { e.preventDefault(); handleSubmitComment(); }}>
        <TextField
          label="Add a comment"
          multiline
          rows={3}
          variant="outlined"
          fullWidth
          margin="normal"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Post Comment
        </Button>
      </form>

       {/* Delete Comment Dialog */}
       
        <DeleteComment
        commentId={selectedCommentId || 0} // Pass the selected comment id (default to 0 if null)
        onDelete={handleConfirmDelete} // Callback to handle actual deletion logic
        onClose={() => setDeleteDialogOpen(false)} // Callback to close the dialog
        open={isDeleteDialogOpen} // Control the visibility of the dialog
        />

      {/* Add a button to close the CommentWall */}
      <Button onClick={onClose} variant="outlined" color="secondary">
        Close Comments
      </Button>
    </Container>
  );
};

export default CommentWall;
