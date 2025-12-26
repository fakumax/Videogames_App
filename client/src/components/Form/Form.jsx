import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postVideogame } from '../../actions/index';
import './Form.scss';
import Back from '../Back/Back.jsx';

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
    // if (!input.release) {
    //   errors.release = 'Release is required';
    // } else if (!/^((0|1)\d{1})-((0|1|2)\d{1})-((19|20)\d{2})$/.test(input.release)) {
    //   errors.release = 'Release is invalid';
    // }
    if (!input.rating) {
      errors.rating = 'Rating is required';
    } else if (!/^[ 0-5_]+(\.[0-9][0-9]?)?$/.test(input.rating)) {
      errors.rating = 'Rating is invalid';
    }
    
      return errors;
  }


//----------- FORM -------------
const Form = () => {
  const { videogame_genres, videogame_platforms } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});

  const [listGenres, setlistGenres] = useState([]);
 const [listPlatforms, setlistPlatforms] = useState([]);
  
  const [input, setInput] = useState({
    name: '',
    description: '',
    release: '',
    rating: '',
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

  const handleSelectGenre = (e) => {
    let target = e.target;
		let name = target.name;
    let value = Array.from(target.selectedOptions, option => ({id:option.value}));
    setlistGenres({
      [name]: value
    });
    console.log(listGenres);
    setInput({
      ...input,
      genres: listGenres.genres,
    });
  };
  const handleSelectPlatform = (e) => {
    let target = e.target;
		let name = target.name;
    let value = Array.from(target.selectedOptions, option => ({id:option.value}));
    setlistPlatforms({
      [name]: value
    });
    console.log(listPlatforms);
    setInput({
      ...input,
      platforms: listPlatforms.platforms,
    });
  };

  const createVideogame = (e) => {
    e.preventDefault();
    dispatch(postVideogame(input));
    console.log(input);
  };

  //---ADD ANOTHER---
  const handleAddOther = (e) => {
    e.preventDefault();
    setInput({
      name: '',
      description: '',
      release: '',
      rating: '',
    });

    
  };
  return (
    <>
      <Back className='link-back' />
      <div className='container-form'>
        <div className='wrapper'>
          <div className='contacts'>
            <h2>Create your Videogame</h2>
          </div>

          <div className='login-box'>
           <form onSubmit={createVideogame}>
              <div className='user-box'>
                <label className='label-form'>Name</label>
                <input
                  id='name'
                  name='name'
                  type='text'
                  autoComplete='off'
                  className='form-control-material'
                  required
                  value={input.name}
                  onChange={handleInputChange}
                />
                {errors.name && <p className='danger'>{errors.name}</p>}
              </div>
              <div className='user-box'>
                <label className='label-form'>Description</label>
                <input
                  id='description'
                  name='description'
                  type='text'
                  autoComplete='off'
                  className='form-control-material'
                  value={input.description}
                  onChange={handleInputChange}
                />
                {errors.description && <p className='danger'>{errors.description}</p>}
              </div>
              <div className='user-box'>
                <label className='label-form'>Release</label>
                <input
                  id='release'
                  name='release'
                  type='date'
                  autoComplete='off'
                  className='form-control-material'
                  value={input.release}
                  onChange={handleInputChange}
                />
                {errors.release && <p className='danger'>{errors.release}</p>}
              </div>
              <div className='user-box'>
                <label className='label-form'>Rating</label>
                <input
                  id='rating'
                  name='rating'
                  type='number'
                  min="0" max="5"
                  step="0.01"
                  autoComplete='off'
                  className='form-control-material'
                  value={input.rating}
                  onChange={handleInputChange}
                />
                {errors.rating && <p className='danger'>{errors.rating}</p>}
              </div>
             




             {/* GENRES ARRAY MAP*/}
              <div className='user-box'>
                <label className='select-label-form'>Genres</label>
                <select
                  name='genres'
                  className='select-form'
                  onChange={handleSelectGenre}
                  multiple={true}
                  value={listGenres}
                
                >
                  {videogame_genres?.map((item, i) => {
                    return (
                      <option key={i} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>

                {/* PLATFORMS ARRAY MAP*/}
                <div className='user-box'>
                <label className='select-label-form'>Platforms</label>
                <select
                  name='platforms'
                  className='select-form'
                   onChange={handleSelectPlatform}
                  multiple={true}
                  value={listPlatforms}
                >
                  {videogame_platforms?.map((item, i) => {
                    return (
                      <option key={i} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              

              <button type='submit' className='full-width'>
                Create
              </button>
              <button type='submit'
                className='full-width'
                onClick={handleAddOther} > Add Other
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;