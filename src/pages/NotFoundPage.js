import React from 'react';
import { useNavigate } from 'react-router-dom';

import "../static/css/Button.css";
import "../static/css/NotFoundPage.css"

const NotFoundPage = () => {
    const navigate = useNavigate();

    const goBack = () => {
    navigate(-1); 
  };
  return (
    <div className="not-found-container">
      <h2>404 - Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <div className="button-area" style={{ display: 'flex', justifyContent: 'center' }}>
        <button className="button-pink" onClick={goBack}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
