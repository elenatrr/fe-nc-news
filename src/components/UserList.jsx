import React, { useEffect, useState, useRef } from 'react';
import { fetchUsers } from '../../api';
import UserItem from './UserItem';
import "../styles/user-list.scss"
import { useUser } from '../contexts/UserContext';
import Loader from './Loader';

const UserList = () => {
  const [users, setUsers] = useState(null)
  const { loggedInUser, setLoggedInUser } = useUser()
  const listRef = useRef(null)

  const handleItemClick = (user) => {
    setLoggedInUser(user)
  }

  const scrollWidth = () => {
    const listItemWidth = listRef.current.scrollWidth / users.length
    return listRef.current ? listItemWidth : 0;
  };

  const next = () => {
    if (listRef.current) {
      const scrollAmount = scrollWidth() * 1;
      listRef.current.scrollLeft += scrollAmount;
    }
  };

  const prev = () => {
    if (listRef.current) {
      const scrollAmount = scrollWidth() * 1;
      listRef.current.scrollLeft -= scrollAmount;
    }
  };

  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data)
    })
  }, [])

  return !users ? <Loader /> : (
    <div className='user-carousel'>
      <button className="user-carousel__btn user-carousel__btn_prev" onClick={prev}></button>
      <div className='users' ref={listRef}>
        {users.map((user) => {
          return (
            <UserItem
              key={user.username}
              user={user}
              isActive={user.username === loggedInUser?.username}
              onClick={handleItemClick}
            />
          )
        })}
      </div>
      <button className="user-carousel__btn user-carousel__btn_next" onClick={next}></button>
    </div>
  );
};

export default UserList;