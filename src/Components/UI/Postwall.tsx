
import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatIcon from '@mui/icons-material/Chat';
import { Dialog, DialogTitle, DialogContent, Button } from '@mui/material';
import CommentWall from './Commentwall';
import SearchSection from './SearchSection';
import DeletePostButton from '../Buttons/DeletePostButton';
import UpdatePostButton from '../Buttons/UpdatePostButton';


interface PostData {
  post_id: number;
  title: string;
  content: string;
  user_id: number;
  created_at: string;
  username: string;
  likes: number;
  comments: number;
  likedBy: number[];
}

const PostWall: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [selectedPost, setSelectedPost] = useState<PostData | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const authToken = localStorage.getItem('authToken');
  
  var userID: number;
  
  if (authToken) {
    // console.error('Authentication token not found');
    // return <></>;
    const payload = JSON.parse(atob(authToken.split('.')[1]));
    userID = payload.user_id;
  }
  


  const fetchPosts = async () => {
    try {
      const response = await fetch('http://0.0.0.0:8082/posts');
      if (response.ok) {
        const data: PostData[] = await response.json();
  
        // Ensure that likedBy is initialized to an empty array for each post
        const postsWithLikes = data.map(post => ({
          ...post,
          likedBy: post.likedBy || [],
        }));
  
        const postsWithLikesCount = await fetchLikes(postsWithLikes);
        setPosts(postsWithLikesCount);
        setFilteredPosts(postsWithLikesCount);
      } else {
        console.error('Error fetching posts:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  


  const fetchLikes = async (postsData: PostData[]) => {
    try {
      const promises = postsData.map(async (post) => {
        const response = await fetch(`http://0.0.0.0:8082/likecount/${post.post_id}`);
        if (response.ok) {
          const likesCount = await response.json();
          return {
            ...post,
            likes: likesCount["like_count"],
          };
        } else {
          console.error(`Error fetching likes for post ID ${post.post_id}:`, response.statusText);
          return post;
        }
      });

      const updatedPosts = await Promise.all(promises);
      return updatedPosts;
    } catch (error) {
      console.error('Error:', error);
      return postsData;
    }
  };

  const handlePostClick = (post: PostData) => {
    console.log('Clicked post:', post); // Add this line for debugging
    setSelectedPost((prevSelectedPost) => (prevSelectedPost === post ? null : post));
    setShowComments(true);
    setPostToDelete(post.post_id);
    setDeleteDialogOpen(true);
  };

  const handleLikeClick = async (post: PostData) => {
    try {
      // Retrieve the JWT token from local storage

      // Check if the user has already liked the post
      const hasLiked = post.likedBy.includes(userID);
  
      let method, updatedLikedBy: number[];
  
      if (hasLiked) {
        // If the user has liked the post, remove the like
        method = 'DELETE';
        updatedLikedBy = post.likedBy.filter((userId) => userId !== userID);
      } else {
        // If the user has not liked the post, add the like
        method = 'POST';
        updatedLikedBy = [...post.likedBy, userID];
      }
  
      // Make a request to the backend endpoint to handle the like
      
      const response = await fetch(`http://0.0.0.0:8082/likes/${post.post_id}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          post_id: post.post_id,
          user_id: userID,
        }),
      });
  
      if (response.ok) {
        // Update the local state to reflect the like
        const updatedPosts = posts.map((p) =>
          p.post_id === post.post_id ? { ...p, likedBy: updatedLikedBy } : p
        );
        setPosts(updatedPosts);
        setFilteredPosts(updatedPosts);
      } else {
        console.error('Failed to handle like:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleCloseDialog = () => {
    setSelectedPost(null);
    setShowComments(false);
  };

  const handleSearch = (query: string) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowercasedQuery) ||
        post.content.toLowerCase().includes(lowercasedQuery) ||
        post.username.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredPosts(filtered);
  };

  const handlePostDelete = async () => {
    try {
      // ... (existing post deletion logic)

      // Update your state or refetch posts to reflect the deletion
      await fetchPosts(); // Assuming you have a fetchPosts function that fetches posts

      // Close the delete dialog after the post is deleted
      setDeleteDialogOpen(false);
      handleCloseDialog(); // This will close the post dialog
    } catch (error) {
      console.error('Error deleting post:', error);
      // Handle error or provide user feedback
    }
  };


  return (
    <Container>
      <SearchSection posts={posts} onSearch={handleSearch} />
      <Grid container spacing={2} style={{ marginTop: '16px'}}>
        {filteredPosts.map((post) => (
          <Grid item key={post.post_id} xs={12}>
            <Card variant="outlined" style={{ marginBottom: 16 }}>
              <CardContent>
                <Typography variant="h5" component="div" onClick={() => handlePostClick(post)}>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.content.slice(0, 80)}...
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Posted by {post.username}
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
                  <IconButton color="primary" aria-label="like" onClick={() => handleLikeClick(post)}>
                    <ThumbUpIcon />
                  </IconButton>
                  <Typography variant="caption" color="text.secondary" style={{ marginRight: 16 }}>
                    {post.likes} Likes
                  </Typography>
                  <IconButton color="primary" aria-label="reply">
                    <ChatIcon />
                  </IconButton>
                  <Typography variant="caption" color="text.secondary">
                    {post.comments} Replies
                  </Typography>
                  {(post.user_id == userID) && <UpdatePostButton
                    postId={post.post_id}
                    currentContent={post.content}
                    // userId= {userID}
                    onUpdate={() => {
                      // You can update the UI or perform other actions after updating
                      fetchPosts(); // Assuming you have a fetchPosts function that fetches posts
                    }}
                  />}
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Post Dialog */}
      <Dialog open={Boolean(selectedPost)} onClose={handleCloseDialog}>
        <DialogTitle>{selectedPost?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{selectedPost?.content}</Typography>
          {/* Render comments here */}
          {showComments && (
            <CommentWall post_id={selectedPost?.post_id || 0} onClose={handleCloseDialog} />
          )}
          {postToDelete && (
            <DeletePostButton postId={postToDelete} onDelete={handlePostDelete} />
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default PostWall;