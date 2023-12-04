import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      {[...Array(totalPages)].map((_, index) => (
        <button key={index} onClick={() => onPageChange(index + 1)}>{index + 1}</button>
      ))}
    </div>
  );
};

export default Pagination;
