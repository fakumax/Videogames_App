import React, { useState } from 'react';
import './SearchBar.scss';
//----------Icons----------
import { VscSearch } from 'react-icons/vsc';
//-------------------------
const SearchBar = ({ handleSearchChange }) => {

  const [input, setInput] = useState('');
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className='formStyle'>
      <input
        id='name'
        name='name'
        type='text'
        autoComplete='off'
        placeholder='Search Game'
        value={input}
        onChange={handleInputChange}
      />
      <button type='submit' onClick={ () => handleSearchChange(input)}>
        <VscSearch className='icon-search' />
      </button>
    </div>
  );
};

export default SearchBar;
