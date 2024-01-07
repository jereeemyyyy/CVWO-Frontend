import React from 'react';
import DropdownButton from './DropdownButton';

const FilterButton: React.FC = () => {
  const options = ['By Time', 'Likes', 'Title'];

  const handleOptionSelect = (selectedOption: string) => {
    // Implement your logic here when an option is selected
    console.log(`Selected option: ${selectedOption}`);
  };

  return (
    <div>
      {/* Other components */}
      <DropdownButton options={options} onOptionSelect={handleOptionSelect} />
      {/* Other components */}
    </div>
  );
};

export default FilterButton;