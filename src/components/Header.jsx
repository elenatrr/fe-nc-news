import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/header.scss";
import { useUser } from "../contexts/UserContext";

const Header = () => {
  const { loggedInUser, setLoggedInUser } = useUser();

  const logout = () => {
    setLoggedInUser(null);
  };

  return (
    <header className='header'>
      <NavLink
        className='header__link'
        to="/articles"
        exact="true"
        reloadDocument
      >
        <div className='header__logo'>
          <img className="header__icon" src="https://i.gstatvb.com/881642647dc9c02da0b501199f0509491710200443.rng.svg" alt="NC News Logo" />
        </div>
      </NavLink>
      {loggedInUser
        ? <nav className='header__menu'>
          <NavLink
            className='header__link'
            to="/"
            onClick={() => { logout(); }}
          >
            <div className='header__logout'></div>
          </NavLink>
          <NavLink className='header__link' to="/post">
            <div className='header__post'></div>
          </NavLink>
          <NavLink className='header__link' to="/profile">
            <div className="header__avatar">
              <img
                className="header__image"
                src={loggedInUser?.avatar_url}
                alt="User Avatar"
              />
            </div>
          </NavLink>
        </nav>
        : <NavLink className="header__login" to="/">Log In</NavLink>}
    </header>
  );
};

export default Header;