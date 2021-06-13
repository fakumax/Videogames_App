import {
    GET_VIDEOGAMES,
    GET_GENRES,
    GET_NAME_VIDEOGAME,
    GET_VIDEOGAME_BY_ID,
    POST_VIDEOGAME,
    GET_PLATFORMS,
  } from '../action-types/index';
  
  const initialState = {
    videogame: [],
    videogame_genres: {},
    videogame_platforms: {},
    videogame_name: {},
    videogame_by_id: {},
    videogame_create:{},
    
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_VIDEOGAMES:
        return {
          ...state,
          videogame: action.payload,
          
        };
      case GET_GENRES:
        return {
          ...state,
          videogame_genres: action.payload,
          
        };
      case GET_PLATFORMS:
          return {
            ...state,
            videogame_platforms: action.payload,
            
          };  
      case GET_NAME_VIDEOGAME:
        return {
          ...state,
          videogame_name: action.payload,
          
        };
      case GET_VIDEOGAME_BY_ID:
        return {
          ...state,
          videogame_by_id: action.payload,
          
        };
        case POST_VIDEOGAME:
          return {
            ...state,
            videogame_create: action.payload,
            
          };
  
      default:
        return state;
    }
  };
  
  export default rootReducer;