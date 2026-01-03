import React from 'react';
import { Link } from 'react-router-dom';
import { VscStarFull } from 'react-icons/vsc';
import './Card.scss';

const Card = (props) => {
  // Mostrar solo las primeras 3 plataformas
  const platformsToShow = props.platforms?.slice(0, 3) || [];
  const hasMorePlatforms = props.platforms?.length > 3;

  return (
    <Link to={`/game/${props.id}`} className='card-link'>
      <div className='card'>
        <div className='card__div'>
          <img className='card__img' src={props.img} alt={props.name} />
          {props.rating && (
            <div className='card__rating'>
              <VscStarFull className='star-icon' />
              <span>{props.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        <div className='card-container'>
          <span className='card__header-title'>{props.name}</span>
          <span className='card__header-meta'>
            {props.genres?.map((v) => v.name).join(' - ')}
          </span>
          {platformsToShow.length > 0 && (
            <div className='card__platforms'>
              {platformsToShow.map((p, i) => (
                <span key={i} className='platform-tag'>{p.name}</span>
              ))}
              {hasMorePlatforms && <span className='platform-more'>+{props.platforms.length - 3}</span>}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;