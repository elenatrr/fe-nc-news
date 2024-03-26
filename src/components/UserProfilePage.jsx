import React from "react";
import { useUser } from "../contexts/UserContext";
import "../styles/user-profile.scss";

const UserProfilePage = () => {
  const { loggedInUser } = useUser();

  return (
    <div className="user-profile">
      <img className="user-profile__img" src={loggedInUser.avatar_url} alt="User Avatar" />
      <p className="user-profile__text">{loggedInUser.name}</p>
      <p className="user-profile__text user-profile__text_blue">@{loggedInUser.username}</p>
    </div>
  );
};

export default UserProfilePage;