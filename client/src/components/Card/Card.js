import React from 'react';
import { Link } from 'react-router-dom';
import './Card.scss';

const Card = (props) => {
  return (
    <div className='card'>
      <div className='card__div'>
        <img className='card__img' src={props.img} alt='' />
      </div>
      <div className='card-container'>
        <Link className='card__header-title' to={`/videogame/${props.id}`}>
          <span>{props.name}</span>
        </Link>
        <span className='card__header-meta'>
          {props.genres?.map((v) => v.name).join(' - ')}
        </span>
      </div>
    </div>
  );
};

export default Card;