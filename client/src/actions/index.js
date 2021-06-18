import axios from 'axios';
import {
  GET_VIDEOGAMES,
  GET_GENRES,
  GET_PLATFORMS,
  GET_VIDEOGAME_BY_ID,
  POST_VIDEOGAME,

} from '../action-types/index';
const {
    VIDEOGAME_LOCAL,
    GENRES_LOCAL,
    PLATFORMS_LOCAL,
} = require('../constants');

export const getAllVideogames = (name) => async (dispatch) => {
  try {
    const {data} = await axios.get(`${VIDEOGAME_LOCAL}?name=${name}`);
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

export const getAllPlatforms = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${PLATFORMS_LOCAL}`);
    dispatch({
      type: GET_PLATFORMS,
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