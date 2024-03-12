import React from 'react';
import "../styles/user-item.scss"

const UserItem = ({user, isActive, onClick}) => {

  return (
    <div
      onClick={() => onClick(user)}
      className={isActive ? 'user user_active' : 'user'}
    >
      <img className="user__image" src={user.avatar_url} alt="User avatar" />
      <p className='user__username'>{user.username}</p>
      <p className='user__name'>{user.name}</p>
    </div>
  );
};

export default UserItem;