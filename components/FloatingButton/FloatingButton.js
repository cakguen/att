import React from 'react';
import './FloatingButton.css'; // You can style this component in a separate CSS file

const FloatingButton = ({ onClick }) => {
  return (
    <button className="floating-button" onClick={onClick}>
      +
    </button>
  );
};

export default FloatingButton;