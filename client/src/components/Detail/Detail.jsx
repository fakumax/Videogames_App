import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getVideogameId } from '../../actions/index';
import defaultimg from '../../assets/img/random-img.png';
import Back from '../Back/Back.jsx';
import './Detail.scss';

const Detail = () => {
  const { id } = useParams();
  const { videogame_by_id } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideogameId(id));
  }, [dispatch, id]);

  return (
    <>
      <Back className='link-back' />
      {videogame_by_id.id && videogame_by_id ? (
        <div className='details_videogame'>
          <div className='details_header'>
            <h1 className='details_name'>{videogame_by_id.name}</h1>
          </div>
          <div className='details_rigth'>
            <img src={videogame_by_id.img || defaultimg} />
            <span>Rating: {videogame_by_id.rating}</span>
            <span>Release: {videogame_by_id.release}</span>
          </div>
          <div className='details_left'>
            <span className='details_genres'>
              Genre: {videogame_by_id.genres?.map((v) => v.name).join(' - ')}
            </span>
            <span className='details_platforms'>
              Platforms:{videogame_by_id.platforms?.map((v) => v.name).join(' - ')}
            </span>
            <span>Description: {videogame_by_id.description}</span>
          </div>
        </div>
      ) : (
        <p className='Body_search'>LOADING</p>
      )}
    </>
  );
};

export default Detail;
