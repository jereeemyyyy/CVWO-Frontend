import React from "react";
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';


const LikeButton: React.FC = () => {
    return (
        <IconButton aria-label="delete" size="small">
            <ThumbUpIcon/>
        </IconButton>
    );
}

export default LikeButton; 