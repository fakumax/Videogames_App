import React, { useState, useEffect } from 'react';
import './Filters.scss';
//---------- UTILS FILTER -------------
import {
  filterByGenre,
  orderByName,
  handleFilterDbApi,
} from '../../utils/filters';

const Filters = ({ videogame, setVideogameList, videogame_genres }) => {
  console.log(videogame_genres);
  const [gameSelected, setgameSelected] = useState(null);
  useEffect(() => {
    setVideogameList(videogame);
  }, [videogame]);

  const FilterByDbApi = (orderMe) => {
    const filteredByDbApi = handleFilterDbApi(orderMe, videogame);
    setVideogameList(filteredByDbApi);
  };

  const [orderBy, setOrderBy] = useState([]);
  const handleOrderChange = (orderMe) => {
    const orderedByName = orderByName(orderMe, videogame);
    setVideogameList(orderedByName);
  };

  const handleSelectChange = (gameSelected) => {
    setgameSelected(gameSelected);
    const filteredByType = filterByGenre(gameSelected, videogame);
    setVideogameList(filteredByType);
  };
  const [filterBy, setFilterBy] = useState('');
  const [GameGenre, setGameGenre] = useState('');

  const handleType_videogame = (e) => {
    setGameGenre({
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter_by = (e) => {
    setFilterBy({
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
        {/*SELECT WHERE IS LOCATED DB OR API*/}
        <div className='Filter-Type'>
          <label>Filter : </label>
          <select
            defaultValue={'default'}
            name='filter_by'
            onChange={(e) => FilterByDbApi(e.target.value)}>
            <option key={0} value='default'>All</option>
            <option key={1} value={1}>Db</option>
            <option key={2} value={2}>Api</option>
          </select>
        </div>
     
        {/*SELECT BY VIDEOGAME GENRE*/}
        <div className='Filter-Videogame'>
          <label>by Videogame: </label>
          <select
            defaultValue={'default'}
            onChange={(e) => handleSelectChange(e.target.value)}>
            <option key={1234} value={'default'}>
              All Videogames
            </option>
            {videogame_genres &&
              videogame_genres.map((item, i) => {
                return (
                  <option key={i} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
          </select>
        </div>
    

      {/*SELECT ORDER BY VIDEOGAME A-Z Z-A RATING*/}
      <div className='Filter-Rating'>
        <label>Order by : </label>
        <select
          defaultValue={'default'}
          onChange={(e) => handleOrderChange(e.target.value)}
        >
          <option key={0} value={'default'}>Rating</option>
          <option key={1} value={1}>A-Z</option>
          <option key={2} value={2}>Z-A</option>
        </select>
      </div>
    </>
  );
};

export default Filters;
