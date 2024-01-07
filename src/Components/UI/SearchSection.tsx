import React from "react";
import { Typography, Box, TextField } from "@mui/material";
import SearchBar from "../SearchBar";

const SearchSection: React.FC = () => {
    return (
        <Box 
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
         <SearchBar />   
        </Box>
    );
}


export default SearchSection;
