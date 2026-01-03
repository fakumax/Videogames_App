import React from 'react';
import './Paged.scss';
//----------Icons----------
import { VscChevronLeft, VscChevronRight, VscLoading } from 'react-icons/vsc';
//-------------------------

const Paged = ({ totalPages, currentPage, hasMore, isLoadingMore, handlePageclick }) => {
  const safeTotal = totalPages || 1;
  const totalLabel = hasMore ? `${safeTotal}+` : safeTotal;
  return (
    <div className='paged_videogame'>
      <div className='label-pagination'>
        <span>{currentPage} / {totalLabel}</span>
      </div>
      <div className='paged_both'>
        <button className='paged-left' name='prev' onClick={handlePageclick} disabled={isLoadingMore}>
          <VscChevronLeft className='icon-left' />
        </button>
        <button className='paged-right' name='next' onClick={handlePageclick} disabled={isLoadingMore}>
          {isLoadingMore ? <VscLoading className='icon-right spinner' /> : <VscChevronRight className='icon-right' />}
        </button>
      </div>
    </div>
  );
};

export default Paged;