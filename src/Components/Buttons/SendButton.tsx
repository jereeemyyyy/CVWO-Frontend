import React from "react";
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';


const SendButton: React.FC = () => {
    return (
        <IconButton aria-label="delete" size="small">
            <SendIcon/>
        </IconButton>
    );
}

export default SendButton; 