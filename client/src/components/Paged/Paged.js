import React from 'react';
import './Paged.scss';
//----------Icons----------
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
//-------------------------

//const Paged = ({ totalPages, currentPage, handlePageclick }) => {
const Paged = ({ handlePageclick }) => {
  return (
    <div className='paged_videogame'>
      {/* <label className='label-pagination'>{totalPages}</label>
      <label className='label-current-pagination'>[ {currentPage} ]</label> */}
      <div className='paged_both'>
        <button className='paged-left' name='prev' onClick={handlePageclick}>
          <VscChevronLeft className='icon-left' />
        </button>
        <button className='paged-right' name='next' onClick={handlePageclick}>
          <VscChevronRight className='icon-right' />
        </button>
      </div>
    </div>
  );
};

export default Paged;