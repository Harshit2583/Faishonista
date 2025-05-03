import React from 'react';
import '../css/styles/LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner-circle"></div>
        <div className="spinner-text">Loading...</div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 