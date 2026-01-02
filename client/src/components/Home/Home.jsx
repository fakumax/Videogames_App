import React, { useEffect, useState } from 'react';
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
  const { videogame, videogame_genres } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [videogameList, setVideogameList] = useState([]);
  const [search , setSearch] = useState('');

  useEffect(() => {
    dispatch(getAllVideogames(search));
    dispatch(getAllGenre());
    dispatch(getAllPlatforms());
  }, [dispatch,search]);

  const handleSearchChange = (newSearch)=>{
    setSearch(newSearch);
  };

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
              //totalPages={totalPages}
              // currentPage={currentPage}
              handlePageclick={handlePageclick}
            />
          </div>
        </>
      ) : (
        <div className='Loading'>
          <div className='Loading__content'>
            <p className='Loading__title'>LOADING...</p>
            <div className='Loading__bar'>
              <div className='Loading__progress'></div>
            </div>
            <p className='Loading__message'>💤 Despertando la base de datos...</p>
            <p className='Loading__submessage'>La DB estaba en modo ahorro de energía. Solo pasa la primera vez, luego va como un rayo ⚡</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
