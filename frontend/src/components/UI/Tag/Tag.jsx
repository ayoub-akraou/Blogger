import React from 'react';

const Tag = ({ name, color, isSelected = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      type='button'
      className="px-3 py-1 rounded-full font-medium  text-sm cursor-pointer transition-all duration-200 border "
      style={{
        backgroundColor: isSelected ? color : 'white',
        color: isSelected ? "white" : '#444',
        borderColor: isSelected ? color : '#444'
      }}
    >
      {name}
    </button>
  );
};

export default Tag;
