import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/not-found.scss"

const NotFound = ({errorMsg}) => {
  return (
    <div className="error">
      <h2 className="error__title">404 - Not Found</h2>
      <p className="error__msg">{errorMsg || "The page you're looking for doesn't exist."}</p>
      <Link
        className="error__btn"
        to={"/articles"}
        onClick={() => setIsNonExistentTopic(false)}
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;