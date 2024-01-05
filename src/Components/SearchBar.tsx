import React from "react";
import { Typography, Box, TextField } from "@mui/material";



const SearchBar: React.FC = () => {
    return (
        <Box 
            sx={{
                width: '60%',
                textAlign: 'center',
                
            }}
            >
            <TextField fullWidth label="Search" id="fullWidth" />
        </Box>
    );
}

export default SearchBar;