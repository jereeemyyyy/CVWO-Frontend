import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatIcon from '@mui/icons-material/Chat';

interface PostProps {
  title: string;
  content: string;
  author: string;
  created_at?: string;
  likes?: number;
  comments?: number;
  onPostClick?: () => void;  
  
}

const Post: React.FC<PostProps> = ({ title, content, author, likes, comments, onPostClick }) => {
  // Extract the first 80 characters of the content
  const shortContent = content.slice(0, 80);

  return (
    <Card variant="outlined" style={{ marginBottom: 16 }} onClick={onPostClick}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {shortContent}...
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Posted by {author}
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
          <IconButton color="primary" aria-label="like">
            <ThumbUpIcon />
          </IconButton>
          <Typography variant="caption" color="text.secondary" style={{ marginRight: 16 }}>
            {likes} Likes
          </Typography>
          <IconButton color="primary" aria-label="reply">
            <ChatIcon />
          </IconButton>
          <Typography variant="caption" color="text.secondary">
            {comments} Replies
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default Post;
