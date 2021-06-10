import axios from 'axios';
import {
  GET_VIDEOGAMES,
  GET_GENRES,
  GET_NAME_VIDEOGAME,
  GET_VIDEOGAME_BY_ID,
  POST_VIDEOGAME,
} from '../action-types/index';
const {
    VIDEOGAME_LOCAL,
    GENRES_LOCAL,
    SEARCH_VIDEOGAME
} = require('../constants');

export const getAllVideogames = () => async (dispatch) => {
  try {
    const {data} = await axios.get(`${VIDEOGAME_LOCAL}`);
    dispatch({
      type: GET_VIDEOGAMES,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllGenre = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${GENRES_LOCAL}`);
    dispatch({
      type: GET_GENRES,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getVideogame = (name) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${SEARCH_VIDEOGAME}${name} `);
    dispatch({
      type: GET_NAME_VIDEOGAME,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getVideogameId = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${VIDEOGAME_LOCAL}/${id} `);
    dispatch({
      type: GET_VIDEOGAME_BY_ID,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const postVideogame = (makeVideogame) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${VIDEOGAME_LOCAL}`, {
      name: makeVideogame.name,
      description: makeVideogame.description,
      release: makeVideogame.release,
      rating: makeVideogame.rating,
      img: makeVideogame.img,
      genres: makeVideogame.genres,
      platforms: makeVideogame.platforms,
    });

    dispatch({
      type: POST_VIDEOGAME,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};