import React from "react";
import IconButton from '@mui/material/IconButton';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const DislikeButton: React.FC = () => {
    return (
        <IconButton aria-label="delete" size="small">
            <ThumbDownIcon/>
        </IconButton>
    );
}

export default DislikeButton; 