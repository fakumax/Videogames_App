import React, { useEffect } from 'react';
import Select from 'react-select';
import './Filters.scss';
//---------- UTILS FILTER -------------
import {
  filterByGenre,
  orderByName,
  handleFilterDbApi,
} from '../../utils/filters';

// Estilos personalizados para react-select
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#2a2a2a',
    borderRadius: '24px',
    border: state.isFocused ? '2px solid #ffff00' : '2px solid #3a3a3a',
    boxShadow: state.isFocused ? '0 0 15px rgba(255, 255, 0, 0.3)' : 'none',
    padding: '4px 8px',
    cursor: 'pointer',
    minHeight: '44px',
    '&:hover': {
      borderColor: '#ffff00',
      boxShadow: '0 0 10px rgba(255, 255, 0, 0.2)',
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#2a2a2a',
    border: '2px solid #3a3a3a',
    borderRadius: '12px',
    marginTop: '8px',
    overflow: 'hidden',
    zIndex: 100,
  }),
  menuList: (provided) => ({
    ...provided,
    padding: '0',
    maxHeight: '250px',
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#1a1a1a',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#ffff00',
      borderRadius: '4px',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#ffff00'
      : state.isFocused
      ? '#3a3a3a'
      : '#2a2a2a',
    color: state.isSelected ? '#1a1a1a' : '#fff',
    padding: '12px 16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:active': {
      backgroundColor: '#ffff00',
      color: '#1a1a1a',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: '0.9rem',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#888',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: '#ffff00',
    transition: 'transform 0.2s ease',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0)',
    '&:hover': {
      color: '#ffff00',
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  input: (provided) => ({
    ...provided,
    color: '#fff',
  }),
};

const Filters = ({ videogame, setVideogameList, videogame_genres }) => {
  useEffect(() => {
    setVideogameList(videogame);
  }, [videogame]);

  // Opciones para los selects
  const filterOptions = [
    { value: 'default', label: 'All' },
    { value: '1', label: 'Db' },
    { value: '2', label: 'Api' },
  ];

  const orderOptions = [
    { value: 'default', label: 'Rating' },
    { value: '1', label: 'A-Z' },
    { value: '2', label: 'Z-A' },
  ];

  const genreOptions = [
    { value: 'default', label: 'All Videogames' },
    ...(videogame_genres
      ? videogame_genres.map((item) => ({
          value: item.name,
          label: item.name,
        }))
      : []),
  ];

  const FilterByDbApi = (selected) => {
    const filteredByDbApi = handleFilterDbApi(selected.value, videogame);
    setVideogameList(filteredByDbApi);
  };

  const handleOrderChange = (selected) => {
    const orderedByName = orderByName(selected.value, videogame);
    setVideogameList(orderedByName);
  };

  const handleSelectChange = (selected) => {
    const filteredByType = filterByGenre(selected.value, videogame);
    setVideogameList(filteredByType);
  };

  return (
    <>
      {/*SELECT WHERE IS LOCATED DB OR API*/}
      <div className='Filter-Container'>
        <span className='filter-label'>Filter:</span>
        <Select
          defaultValue={filterOptions[0]}
          options={filterOptions}
          styles={customStyles}
          onChange={FilterByDbApi}
          isSearchable={false}
          classNamePrefix='custom-select'
        />
      </div>

      {/*SELECT BY VIDEOGAME GENRE*/}
      <div className='Filter-Container Filter-Genre'>
        <span className='filter-label'>by Videogame:</span>
        <Select
          defaultValue={genreOptions[0]}
          options={genreOptions}
          styles={customStyles}
          onChange={handleSelectChange}
          isSearchable={true}
          placeholder='Search genre...'
          classNamePrefix='custom-select'
        />
      </div>

      {/*SELECT ORDER BY VIDEOGAME A-Z Z-A RATING*/}
      <div className='Filter-Container'>
        <span className='filter-label'>Order by:</span>
        <Select
          defaultValue={orderOptions[0]}
          options={orderOptions}
          styles={customStyles}
          onChange={handleOrderChange}
          isSearchable={false}
          classNamePrefix='custom-select'
        />
      </div>
    </>
  );
};

export default Filters;
