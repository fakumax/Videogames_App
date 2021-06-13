import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogame } from '../../actions/index';
import './SearchBar.scss';
//----------Icons----------
//import { VscSearch } from 'react-icons/vsc';
//-------------------------
const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const submitVideogame = (e) => {
    e.preventDefault();
    dispatch(getVideogame(name));
  };

  return (
    <form onSubmit={submitVideogame} className='formStyle'>
      <input
        id='name'
        name='name'
        type='text'
        autoComplete='off'
        placeholder='Search Game'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {/* <button type='submit'>
        <VscSearch className='icon-search' />
      </button> */}
    </form>
    
  );
};

export default SearchBar;
