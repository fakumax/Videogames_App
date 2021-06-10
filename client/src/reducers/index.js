import {
    GET_VIDEOGAMES,
    GET_GENRES,
    GET_NAME_VIDEOGAME,
    GET_VIDEOGAME_BY_ID,
    POST_VIDEOGAME,
  } from '../action-types/index';
  
  const initialState = {
    videogame: [],
    videogame_genres: {},
    videogame_name: {},
    videogame_by_id: {},
    videogame_create:{},
    error: null,
    loading: false,
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_VIDEOGAMES:
        return {
          ...state,
          videogame: action.payload,
          loading: false,
        };
      case GET_GENRES:
        return {
          ...state,
          videogame_genres: action.payload,
          loading: false,
        };
      case GET_NAME_VIDEOGAME:
        return {
          ...state,
          videogame_name: action.payload,
          loading: false,
        };
      case GET_VIDEOGAME_BY_ID:
        return {
          ...state,
          videogame_by_id: action.payload,
          loading: false,
        };
        case POST_VIDEOGAME:
          return {
            ...state,
            videogame_create: action.payload,
            loading: false,
          };
  
      default:
        return state;
    }
  };
  
  export default rootReducer;