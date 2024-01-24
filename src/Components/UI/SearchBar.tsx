import React, { useState, ChangeEvent, CSSProperties } from "react";
import { Box, TextField } from "@mui/material";

interface SearchBarProps {
  onSearch: (query: string) => void;
  width?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, width = '60%' }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const searchBarStyle: CSSProperties = {
    width: width,
    textAlign: 'center',
  };

  return (
    <Box sx={searchBarStyle}>
      <TextField
        fullWidth
        label="Search"
        id="fullWidth"
        value={searchQuery}
        onChange={handleChange}
      />
    </Box>
  );
};

export default SearchBar;
