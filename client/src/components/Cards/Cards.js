import React from 'react';
import Card from '../Card/Card';
import defaultimg from '../../assets/img/random-img.png';
import './Cards.scss';

const Cards = ({ videogames }) => {
 return (
    <div className = 'cards_result'>
      {videogames?.map((game) => {
        return (
          <Card
            key={game.id}
            id={game.id}
            name={game.name}
            img={game.img || defaultimg}
            genres={game.genres}
          />
        );
      })}
    </div>
  );
};

export default Cards;