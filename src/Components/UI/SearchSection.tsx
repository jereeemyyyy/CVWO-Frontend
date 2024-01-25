// SearchSection.tsx
import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import SearchBar from "./SearchBar";
import CreatePostButton from "../Buttons/CreatePostButton";

interface PostData {
    post_id: number;
    title: string;
    content: string;
    user_id: number;
    created_at: string;
    username: string;
    likes: number;
    comment_count: number;
    
  }

interface SearchSectionProps {
  posts: PostData[];
  onSearch: (query: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ posts, onSearch }) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // Add this to space the items
        marginBottom: 2, // Add margin for separation
      }}
    >
      {/* Search bar */}
      <SearchBar onSearch={onSearch} width="80%" />
      
      {/* "Create Post" button */}
      <CreatePostButton onCreatePost={(title, content) => console.log(title, content)} />
      
    </Box>
  );
};

export default SearchSection;