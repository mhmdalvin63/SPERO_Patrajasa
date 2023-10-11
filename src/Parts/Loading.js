// src/components/Loading.js
import React from 'react';
import '../Css/Parts/Loading.css';

const Loading = () => {
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div className="loading">
      <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default Loading;
