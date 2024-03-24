import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/error.scss";

const ErrorPage = ({isNotFound}) => {
  const title = isNotFound ? "404 - Not Found" : "400 - Bad Request";
  const message = isNotFound ? "The page you're looking for doesn't exist." : "Something went wrong with your request.\nPlease check the passed information and try again.";
  return (
    <div className="error">
      <h2 className="error__title">{title}</h2>
      <p className="error__msg">{message}</p>
      <NavLink
        className="error__btn"
        to={{ pathname: "/articles" }}
        reloadDocument
      >
        Go Home
      </NavLink>
    </div>
  );
};

export default ErrorPage;