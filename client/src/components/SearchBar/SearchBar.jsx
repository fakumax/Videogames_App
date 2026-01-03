import React, { useState } from 'react';
import './SearchBar.scss';
//----------Icons----------
import { VscSearch, VscLoading } from 'react-icons/vsc';
//-------------------------
const SearchBar = ({ handleSearchChange }) => {

  const [input, setInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    if (input.trim() === '') return;
    setIsSearching(true);
    handleSearchChange(input);
    // Simular que termina después de un tiempo razonable
    setTimeout(() => setIsSearching(false), 3000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='formStyle'>
      <div className={`searchContainer ${isSearching ? 'searching' : ''}`}>
        <VscSearch className='icon-search-left' />
        <input
          id='name'
          name='name'
          type='text'
          autoComplete='off'
          placeholder='Search Game'
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={isSearching}
        />
        <button type='submit' onClick={handleSearch} disabled={isSearching}>
          {isSearching ? (
            <VscLoading className='icon-search spinner' />
          ) : (
            <VscSearch className='icon-search' />
          )}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
