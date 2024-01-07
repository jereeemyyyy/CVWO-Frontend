import React from "react";
import IconButton from '@mui/material/IconButton';
import ReplyIcon from '@mui/icons-material/Reply';


const ReplyButton: React.FC = () => {
    return (
        <IconButton aria-label="delete" size="small">
            <ReplyIcon/>
        </IconButton>
    );
}

export default ReplyButton; 