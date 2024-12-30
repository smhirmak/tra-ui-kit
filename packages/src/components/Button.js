import React from 'react';

const Button = ({ children, onClick }) => {
  return (
    <button className="bg-primary text-white py-2 px-4 rounded" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;