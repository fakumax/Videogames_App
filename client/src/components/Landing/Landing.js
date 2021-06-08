import React from 'react';
import { Link } from 'react-router-dom';
import InsertCoin from '../../assets/img/insert-coin.gif'
import './Landing.scss';

const Landing = () => {
  return (
    <div className='Landing'>
      <h1>Welcome to Videogame Finder</h1>
      <Link to={'/home'}>
        <button className='InsertCoin'>Go Home</button>
      </Link>
      <img className='InsertCoin' src={InsertCoin}></img>
    </div>
  );
};

export default Landing;
