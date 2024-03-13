import React from 'react';
import UserList from './UserList';
import "../styles/welcome-page.scss"
import { useUser } from '../contexts/UserContext';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  const { loggedInUser } = useUser();

  return (
    <main className='wrapper'>
      <div className='welcome'>
        <h2 className='welcome__title'>Welcome to Northcoders News!</h2>
        <h3 className='welcome__subtitle'><span className='welcome__span welcome__span_blue'>Create,</span> <span className='welcome__span welcome__span_green'>Discover,</span> <span className='welcome__span welcome__span_red'>Rate,</span> <span className='welcome__span welcome__span_pink'>and Comment</span> Engaging Content...</h3>
        <p className='welcome__info'>Northcoders News is your go-to platform for the latest in social news aggregation, content rating, and vibrant discussions. Dive into a world where information meets interaction, with articles spanning a diverse range of topics.</p>
        <h3 className='welcome__subtitle'>...but first <span className='welcome__span'>choose an account to log in:</span></h3>
        <UserList />
        <Link to={"/articles"} className={loggedInUser ? 'welcome__btn welcome__btn_active' : 'welcome__btn'} onClick={(e) => !loggedInUser ? e.preventDefault() : null}>Log me in!</Link>
      </div>
    </main>
  );
};

export default WelcomePage;