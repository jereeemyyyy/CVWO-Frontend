// DropdownButton.tsx
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SortIcon from '@mui/icons-material/Sort';

interface DropdownButtonProps {
  options: string[];
  onOptionSelect: (option: string) => void;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ options, onOptionSelect }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionSelect = (option: string) => {
    onOptionSelect(option);
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-controls="dropdown-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <SortIcon />
      </IconButton>
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem value="">
            <em>Sort by</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleOptionSelect(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DropdownButton;
