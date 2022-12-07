import { PropTypes } from 'prop-types';

function Pager({
  totalPages,
  currentPage,
  onPageChanged,
  numberOfVisiblePageButtons,
  className,
}) {
  const handleClick = (pageNumber) => {
    onPageChanged(pageNumber);
  };

  const range = (start, end) => {
    const res = [];
    for (let i = start; i <= end; i++) {
      res.push(i);
    }
    return res;
  };

  const renderButtons = () => {
    const start = currentPage - numberOfVisiblePageButtons <= 1
      ? 1
      : currentPage - numberOfVisiblePageButtons;
    const end = currentPage + numberOfVisiblePageButtons >= totalPages
      ? totalPages
      : currentPage + numberOfVisiblePageButtons;

    return range(start, end).map((pageNumber) => {
      const isActive = pageNumber === currentPage && 'btn-active';

      return (
        <button
          type="submit"
          key={pageNumber}
          className={`btn ${isActive}`}
          onClick={() => handleClick(pageNumber)}
        >
          {pageNumber}
        </button>
      );
    });
  };

  if (totalPages > 1) {
    return (
      <nav className={className}>
        {currentPage - numberOfVisiblePageButtons > 1 && (
          <button
            className="btn"
            onClick={() => handleClick(1)}
            type="submit"
          >
            1
          </button>
        )}

        {currentPage - numberOfVisiblePageButtons > 2 && (
          <button
            className="btn btn-disabled"
            type="submit"
          >
            ...
          </button>
        )}

        {renderButtons()}

        {totalPages - currentPage - numberOfVisiblePageButtons > 1 && (
          <button type="submit" className="btn btn-disabled">...</button>
        )}

        {totalPages - currentPage - numberOfVisiblePageButtons > 0 && (
          <button type="submit" className="btn" onClick={() => handleClick(totalPages)}>
            {totalPages}
          </button>
        )}
      </nav>
    );
  }
}

Pager.defaultProps = {
  numberOfVisiblePageButtons: 2,
  className: '',
};

Pager.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  numberOfVisiblePageButtons: PropTypes.number,
  onPageChanged: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Pager;
