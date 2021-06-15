import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideogames, getAllGenre, getAllPlatforms} from '../../actions/index';
import SearchBar from '../SearchBar/SearchBar';
import Cards from '../Cards/Cards';
import Filters from '../Filters/Filters';
import Logo from '../../assets/img/videogame.png';
import Paged from '../Paged/Paged';
import { Link } from 'react-router-dom';
import { VscAdd } from 'react-icons/vsc';
import './Home.scss';

const Home = () => {
  const { videogame, videogame_genres,videogame_platforms,videogame_name } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [videogameList, setVideogameList] = useState([]);
  const [filter, setFilters] = useState(false);

  useEffect(() => {
    dispatch(getAllVideogames());
    dispatch(getAllGenre());
    dispatch(getAllPlatforms());
  }, [dispatch]);

  useEffect(() => {
    setVideogameList(videogame);
  }, [videogame]);

  //------ PAGINATION-----------

  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState([]);

  useEffect(() => {
    setTotalPages(Math.ceil(videogameList.length / itemsPerPage));
    setPage(videogameList.slice(0, 15));
  }, [videogameList]);

  useEffect(() => {
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    setPage(videogameList.slice(firstIndex, lastIndex));
  }, [currentPage]);

  const handlePageclick = (e) => {
    e.preventDefault();
    if (e.target.name === 'next') {
      if (currentPage + 1 > totalPages) return;
      setCurrentPage(currentPage + 1);
    } else {
      if (currentPage - 1 < 1) return;
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div className='Home'>
      {videogame_genres.length > 15 && videogame.length > 15 ? (
        <>
          <div className='Aside'>
            <Link to='/'>
              <img src={Logo} alt='videogames icon' />
            </Link>
            <p>Videogame Finder</p>
            <Link to='/create' className = 'icon-create'>
                Create <VscAdd className='icon-search' />
            </Link>
          </div>

          <div className='BodyComplete'>
            <SearchBar />
            <div className='filters'>
              <Filters
                videogame={videogame}
                setVideogameList={setVideogameList}
                videogame_genres={videogame_genres}
              />
            </div>
            {videogame_name.length>0 ? <Cards videogames={videogame_name} />:
            <Cards videogames={page} />
            }

            <Paged
              // totalPages={totalPages}
              // currentPage={currentPage}
              handlePageclick={handlePageclick}
            />
          </div>
        </>
      ) : (
        <p className='Body_search'>LOADING</p>
      )}
    </div>
  );
};

export default Home;
