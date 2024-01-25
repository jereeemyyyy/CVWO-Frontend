
import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatIcon from '@mui/icons-material/Chat';
import { Dialog, DialogTitle, DialogContent, Button } from '@mui/material';
import CommentWall from './Commentwall';
import SearchSection from './SearchSection';
import DeletePostButton from '../Buttons/DeletePostButton';
import UpdatePostButton from '../Buttons/UpdatePostButton';

interface UserInfo {
  user_id: number;
  // Add other user-related fields if needed
}

interface PostData {
  post_id: number;
  title: string;
  content: string;
  user_id: number;
  created_at: string;
  username: string;
  likes: number;
  comment_count: number;
  likedBy: number[];
}

const PostWall: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [selectedPost, setSelectedPost] = useState<PostData | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  // Retrieve the JWT token from local storage
  const authToken = localStorage.getItem('authToken');
  
  var userID: number;
  
  if (authToken) {
    const payload = JSON.parse(atob(authToken.split('.')[1]));
    userID = payload.user_id;
  }
  

  const fetchPosts = async () => {
    try {
      // Sends a request to backend to fetch data from posts
      const response = await fetch('https://cvwo-backend-web-services.onrender.com/posts');
      if (response.ok) {
        const data: PostData[] = await response.json();
  
        // Ensure that likedBy is initialized to an empty array for each post
        const postsWithLikes = data.map(post => ({
          ...post,
          likedBy: post.likedBy || [],
        }));
  
        console.log(data);
        console.log(postsWithLikes);
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
        // Sends a request to backend to fetch data from likes
        const response = await fetch(`https://cvwo-backend-web-services.onrender.com/likecount/${post.post_id}`);
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

  // Clicking of post logic
  const handlePostClick = (post: PostData) => {
    console.log('Clicked post:', post); // Add this line for debugging
  
    if (post.user_id === userID) {
      // Set the post to delete only if the current user is the creator
      setPostToDelete(post.post_id);
      setDeleteDialogOpen(true);
    } else {
      setPostToDelete(null);
    }
  
    setSelectedPost((prevSelectedPost) => (prevSelectedPost === post ? null : post));
    setShowComments(true);
  };

  // Logic for liking a post
  const handleLikeClick = async (post: PostData) => {
    try {
      
      // Check if the user has already liked the post
      const hasLiked = post.likedBy.includes(userID);
  
      let method: string, updatedLikedBy: number[];
  
      if (hasLiked) {
        // If the user has liked the post, remove the like
        method = 'DELETE';
        updatedLikedBy = post.likedBy.filter((userId) => userId !== userID);
      } else {
        // If the user has not liked the post, add the like
        method = 'POST';
        updatedLikedBy = [...post.likedBy, userID];
      }

      // Optimistic UI update: Update the like count locally
      const updatedPosts = posts.map((p) =>
        p.post_id === post.post_id ? { ...p, likedBy: method === 'POST' ? updatedLikedBy : updatedLikedBy.filter((userId) => userId !== userID), likes: updatedLikedBy.length } : p
        );
      setPosts(updatedPosts);
      setFilteredPosts(updatedPosts);
  
      // Make a request to the backend to fetch data from likes
      const response = await fetch(`https://cvwo-backend-web-services.onrender.com/likes`, {
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
        //Update the local state to reflect the like
        // const updatedPosts = posts.map((p) =>
        //   p.post_id === post.post_id ? { ...p, likedBy: updatedLikedBy } : p
        // );
        // setPosts(updatedPosts);
        // setFilteredPosts(updatedPosts);
      } else {
        console.error('Failed to handle like:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // Closes the dialog
  const handleCloseDialog = () => {
    setSelectedPost(null);
    setShowComments(false);
  };

  // Logic for the seach bar
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

  // Logic for deleting a post
  const handlePostDelete = async () => {
    try {
      if (postToDelete) {
  
        await fetchPosts(); 
  
        // Close the delete dialog after the post is deleted
        setDeleteDialogOpen(false);
        console.log(79);
        handleCloseDialog(); // This will close the post dialog
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      // Handle error or provide user feedback
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
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
                  Posted by {post.username} at {formatDate(post.created_at)}
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
                  <IconButton color="primary" aria-label="like" onClick={() => handleLikeClick(post)}>
                    <ThumbUpIcon />
                  </IconButton>
                  <Typography variant="caption" color="text.secondary" style={{ marginRight: 16 }}>
                    {post.likes} Likes
                  </Typography>
                  <IconButton onClick={() => handlePostClick(post)} color="primary" aria-label="reply">
                    <ChatIcon />
                  </IconButton>
                  <Typography variant="caption" color="text.secondary">
                    {post.comment_count} Replies
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
        <DialogContent style={{ position: 'relative' }}>
          <Typography variant="body1">{selectedPost?.content}</Typography>
          {/* Render comments here */}
          {showComments && (
            <CommentWall post_id={selectedPost?.post_id || 0} onClose={handleCloseDialog} />
          )}
          {postToDelete && (
            <div style={{ position: 'absolute', bottom: 0, right: 0, margin: '16px' }}>
              <DeletePostButton postId={postToDelete} onDelete={handlePostDelete} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default PostWall;