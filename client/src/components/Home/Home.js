import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideogames, getAllGenre } from '../../actions/index';
import SearchBar from '../SearchBar/SearchBar';
import Cards from '../Cards/Cards';
import './Home.scss';

const Home = () => {

  const { videogame } = useSelector((state) => state);
  const { videogame_genres } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [videogameList, setVideogameList] = useState([]);
  const [filter, setFilters] = useState(false);

  useEffect(() => {
    dispatch(getAllVideogames());
    dispatch(getAllGenre());
  }, [dispatch]);

  useEffect(() => {
    setVideogameList(videogame);
  }, [videogame]);

  //------ PAGINATION-----------

  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState([]);

  useEffect(() => {
    setTotalPages(Math.ceil(videogameList.length / itemsPerPage));
    setPage(videogameList.slice(0, 12));
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
      <div>
      <h1>Videogames </h1>
        <h1>Search </h1>
        <h1>Create </h1>
      </div>
      <div className ='BodyComplete'>
        <SearchBar />
        <Cards videogames={page} />
      </div>
    </div>
  );
};

export default Home;
