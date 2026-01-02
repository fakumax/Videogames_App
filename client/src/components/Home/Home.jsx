import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideogames, getAllGenre, getAllPlatforms} from '../../actions/index';
import SearchBar from '../SearchBar/SearchBar.jsx';
import Cards from '../Cards/Cards.jsx';
import Filters from '../Filters/Filters.jsx';
import Logo from '../../assets/img/videogame.png';
import Paged from '../Paged/Paged.jsx';
import { Link } from 'react-router-dom';
import { VscAdd } from 'react-icons/vsc';
import './Home.scss';

const Home = () => {
  const { videogame, videogame_genres, hasMore, apiPage } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [videogameList, setVideogameList] = useState([]);
  const [search , setSearch] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  //------ PAGINATION-----------
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllVideogames(search, 1, itemsPerPage, false));
    dispatch(getAllGenre());
    dispatch(getAllPlatforms());
    setCurrentPage(1);
  }, [dispatch, search, itemsPerPage]);

  const handleSearchChange = (newSearch)=>{
    setSearch(newSearch);
  };

  useEffect(() => {
    setVideogameList(videogame);
  }, [videogame]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(videogameList.length / itemsPerPage)),
    [videogameList.length, itemsPerPage]
  );

  const page = useMemo(() => {
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    return videogameList.slice(firstIndex, lastIndex);
  }, [videogameList, currentPage, itemsPerPage]);

  const ready =
    Array.isArray(videogame_genres) && videogame_genres.length > 0 &&
    Array.isArray(videogame) && videogame.length > 0;

  const handlePageclick = async (e) => {
    e.preventDefault();
    const direction = e.currentTarget.name; // usa el botón, no el ícono interno
    if (direction === 'next') {
      const totalPagesLocal = Math.max(1, Math.ceil(videogameList.length / itemsPerPage));
      const isLastLocalPage = currentPage >= totalPagesLocal;

      if (!isLastLocalPage) {
        setCurrentPage(currentPage + 1);
        return;
      }

      // Si estamos en la última página local y hay más en el servidor, cargamos la siguiente
      if (hasMore) {
        setIsLoadingMore(true);
        try {
          await dispatch(getAllVideogames(search, apiPage + 1, itemsPerPage, true));
          setCurrentPage(currentPage + 1);
        } finally {
          setIsLoadingMore(false);
        }
      }
    } else {
      if (currentPage - 1 < 1) return;
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div className='Home'>
      {ready ? (
        <>
          <header className='Header'>
            <Link to='/' className='Header__logo'>
              <img src={Logo} alt='videogames icon' />
              <span className='Header__title'>Videogame APP</span>
            </Link>
            <Link to='/create' className='Header__create'>
              <VscAdd className='icon-add' /> Create
            </Link>
          </header>

          <div className='MainRow'>
            <div className='BodyComplete'>
              <SearchBar handleSearchChange={handleSearchChange} />
              <div className='filters'>
                <Filters
                  videogame={videogame}
                  setVideogameList={setVideogameList}
                  videogame_genres={videogame_genres}
                />
              </div>
              
              <Cards videogames={page} />
              

              <Paged
                totalPages={totalPages}
                currentPage={currentPage}
                hasMore={hasMore}
                isLoadingMore={isLoadingMore}
                handlePageclick={handlePageclick}
              />
            </div>
          </div>

          <footer className='Footer'>
            <span>Hecho con</span>{' '}
            <span className='Footer__name'>Facundo Vergara</span>{' '}
            <span className='Footer__year'>© 2026</span>
          </footer>
        </>
      ) : (
        <div className='Loading'>
          <div className='Loading__content'>
             <p className='Loading__title'>LOADING...</p>
            <div className='Loading__bar'>
              <div className='Loading__progress'></div>
            </div>
            <p className='Loading__message'>💤 The database was snoozing.</p>
            <p className='Loading__submessage'>Happens only the first time—then it flies ⚡</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
