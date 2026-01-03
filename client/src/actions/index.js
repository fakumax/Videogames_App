import axios from 'axios';
import {
  GET_VIDEOGAMES,
  GET_GENRES,
  GET_PLATFORMS,
  GET_VIDEOGAME_BY_ID,
  POST_VIDEOGAME,

} from '../action-types/index';

export const getAllVideogames = (name = '', page = 1, pageSize = 15, append = false) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/videogames`, {
      params: {
        name,
        page,
        page_size: pageSize,
      },
    });

    dispatch({
      type: GET_VIDEOGAMES,
      payload: {
        results: data.results,
        hasMore: data.hasMore,
        page: data.page,
        total: data.total,
      },
      meta: { append },
    });

    return data; // permite esperar en el componente
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllGenre = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/genres`);
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
    const { data } = await axios.get(`/platforms`);
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
    const { data } = await axios.get(`/videogames/${id} `);
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
    const { data } = await axios.post(`/videogames`, {
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