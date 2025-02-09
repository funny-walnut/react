import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPage = parseInt(
    new URLSearchParams(location.search).get('page') || '1'
  );
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    navigate(`/search?page=${page}`);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === currentPage}
          style={{
            margin: '0 5px',
            padding: '5px 10px',
            cursor: i === currentPage ? 'not-allowed' : 'pointer',
          }}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <div>{renderPageNumbers()}</div>
    </div>
  );
};

export default Pagination;
