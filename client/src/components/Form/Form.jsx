import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postVideogame, getAllGenre, getAllPlatforms } from '../../actions/index';
import { useNavigate } from 'react-router-dom';
import './Form.scss';
import Back from '../Back/Back.jsx';
import Select from 'react-select';

export function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = 'Name is required';
    } else if (!/^[ a-zA-Z0-9_-]{3,10}$/.test(input.name)) {
      errors.name = 'Name is invalid';
    }
    if (!input.description) {
      errors.description = 'Description is required';
    } else if (!/^(?!\s*$).+$/.test(input.description)) {
      errors.description = 'Description is invalid';
    }
    if (!input.rating) {
      errors.rating = 'Rating is required';
    } else if (!/^[ 0-5_]+(\.[0-9][0-9]?)?$/.test(input.rating)) {
      errors.rating = 'Rating is invalid';
    }
    
    return errors;
}

// Custom styles for react-select
const selectStyles = {
  control: (base, state) => ({
    ...base,
    background: '#2a2a2a',
    borderColor: state.isFocused ? '#f5e27f' : '#444',
    boxShadow: state.isFocused ? '0 0 0 1px #f5e27f' : 'none',
    '&:hover': {
      borderColor: '#f5e27f'
    },
    minHeight: '42px'
  }),
  menu: (base) => ({
    ...base,
    background: '#2a2a2a',
    border: '1px solid #444'
  }),
  option: (base, state) => ({
    ...base,
    background: state.isSelected ? '#f5e27f' : state.isFocused ? '#3a3a3a' : '#2a2a2a',
    color: state.isSelected ? '#1a1a1a' : '#fff',
    '&:active': {
      background: '#f5e27f'
    }
  }),
  multiValue: (base) => ({
    ...base,
    background: '#f5e27f',
    borderRadius: '4px'
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: '#1a1a1a',
    fontWeight: '500'
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: '#1a1a1a',
    '&:hover': {
      background: '#e5d26f',
      color: '#000'
    }
  }),
  input: (base) => ({
    ...base,
    color: '#fff'
  }),
  placeholder: (base) => ({
    ...base,
    color: '#888'
  }),
  singleValue: (base) => ({
    ...base,
    color: '#fff'
  })
};

//----------- FORM -------------
const Form = () => {
  const { videogame_genres, videogame_platforms } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllGenre());
    dispatch(getAllPlatforms());
  }, [dispatch]);

  const [errors, setErrors] = useState({});
  const [listGenres, setlistGenres] = useState([]);
  const [listPlatforms, setlistPlatforms] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  
  const [input, setInput] = useState({
    name: '',
    description: '',
    release: '',
    rating: '',
    img: '',
  });

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelectGenre = (selectedOptions) => {
    const value = selectedOptions ? selectedOptions.map(opt => ({ id: opt.value })) : [];
    setlistGenres(value);
    setInput({
      ...input,
      genres: value,
    });
  };

  const handleSelectPlatform = (selectedOptions) => {
    const value = selectedOptions ? selectedOptions.map(opt => ({ id: opt.value })) : [];
    setlistPlatforms(value);
    setInput({
      ...input,
      platforms: value,
    });
  };

  const createVideogame = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      await dispatch(postVideogame(input));
      navigate('/home');
    } catch (error) {
      alert('Error creating game. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  //---CLEAR FORM---
  const handleClearForm = (e) => {
    e.preventDefault();
    setInput({
      name: '',
      description: '',
      release: '',
      rating: '',
      img: '',
    });
    setlistGenres([]);
    setlistPlatforms([]);
  };

  // Convert to react-select format
  const genreOptions = Array.isArray(videogame_genres) 
    ? videogame_genres.map(g => ({ value: g.id, label: g.name })) 
    : [];
  
  const platformOptions = Array.isArray(videogame_platforms) 
    ? videogame_platforms.map(p => ({ value: p.id, label: p.name })) 
    : [];

  return (
    <div className='Form'>
      <Back className='link-back' />
      <div className='Form__container'>
        <h2 className='Form__title'>Create your Videogame</h2>
        
        <form onSubmit={createVideogame} className='Form__form'>
          <div className='Form__group'>
            <label className='Form__label'>Name</label>
            <input
              id='name'
              name='name'
              type='text'
              autoComplete='off'
              className='Form__input'
              placeholder='Enter game name'
              required
              value={input.name}
              onChange={handleInputChange}
            />
            {errors.name && <p className='Form__error'>{errors.name}</p>}
          </div>

          <div className='Form__group'>
            <label className='Form__label'>Description</label>
            <textarea
              id='description'
              name='description'
              autoComplete='off'
              className='Form__input Form__textarea'
              placeholder='Enter game description'
              rows='3'
              value={input.description}
              onChange={handleInputChange}
            />
            {errors.description && <p className='Form__error'>{errors.description}</p>}
          </div>

          <div className='Form__group'>
            <label className='Form__label'>Image URL</label>
            <input
              id='img'
              name='img'
              type='url'
              autoComplete='off'
              className='Form__input'
              placeholder='https://example.com/image.jpg'
              value={input.img}
              onChange={handleInputChange}
            />
          </div>

          <div className='Form__row'>
            <div className='Form__group Form__group--half'>
              <label className='Form__label'>Release Date</label>
              <input
                id='release'
                name='release'
                type='date'
                className='Form__input'
                value={input.release}
                onChange={handleInputChange}
              />
            </div>

            <div className='Form__group Form__group--half'>
              <label className='Form__label'>Rating</label>
              <input
                id='rating'
                name='rating'
                type='number'
                min='0'
                max='5'
                step='0.01'
                className='Form__input'
                placeholder='0 - 5'
                value={input.rating}
                onChange={handleInputChange}
              />
              {errors.rating && <p className='Form__error'>{errors.rating}</p>}
            </div>
          </div>

          <div className='Form__group'>
            <label className='Form__label'>Genres</label>
            <Select
              isMulti
              name='genres'
              options={genreOptions}
              styles={selectStyles}
              placeholder='Select genres...'
              onChange={handleSelectGenre}
              className='Form__select'
            />
          </div>

          <div className='Form__group'>
            <label className='Form__label'>Platforms</label>
            <Select
              isMulti
              name='platforms'
              options={platformOptions}
              styles={selectStyles}
              placeholder='Select platforms...'
              onChange={handleSelectPlatform}
              className='Form__select'
            />
          </div>

          <div className='Form__buttons'>
            <button 
              type='submit' 
              className='Form__btn Form__btn--primary'
              disabled={isCreating}
            >
              {isCreating ? (
                <>
                  <span className='Form__spinner'></span>
                  Creating...
                </>
              ) : (
                'Create Game'
              )}
            </button>
            <button
              type='button'
              className='Form__btn Form__btn--secondary'
              onClick={handleClearForm}
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
