import { PropTypes } from 'prop-types'

function Pager({totalPages, currentPage, onPageChanged, numberOfVisiblePageButtons}) {
    
    const handleClick = (pageNumber) => {
        onPageChanged(pageNumber);
    }

    const range = (start, end) => {
        const res = [];
        for (let i = start; i <= end; i++) {
            res.push(i);
        }
        return res;
    }

    const renderButtons = () => {
        
        const start = currentPage - numberOfVisiblePageButtons <= 1 ? 1 : currentPage - numberOfVisiblePageButtons
        const end = (currentPage + numberOfVisiblePageButtons) >= totalPages ? totalPages : (currentPage + numberOfVisiblePageButtons)
        
        return range(start, end).map((pageNumber, key) => {

			const isActive = pageNumber === currentPage && 'btn-active'
            
			return (
				<button
					key={key}
					className={`btn ${isActive}`}
					onClick={() => handleClick(pageNumber)}
				>{pageNumber}</button>
			);
		});
        
    }

    if(totalPages > 1) {
        return (
            <div className="btn-group">

                { currentPage - numberOfVisiblePageButtons > 1 &&
                (<button
                    className="btn"
                    onClick={() => handleClick(1)}
                >1</button>)
                }
                
                { currentPage - numberOfVisiblePageButtons > 2 &&
                    (<button className="btn btn-disabled">...</button>)
                }

                {  renderButtons() }

                { totalPages - currentPage - numberOfVisiblePageButtons > 1 &&
                    (<button className="btn btn-disabled">...</button>)
                }
                
                { totalPages - currentPage - numberOfVisiblePageButtons > 0 &&
                (<button
                    className="btn"
                    onClick={() => handleClick(totalPages)}
                >{totalPages}</button>)
                }
            </div>
        )
    }
}

Pager.defaultProps = {
    numberOfVisiblePageButtons: 2,
}

Pager.propTypes = {
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    numberOfVisiblePageButtons: PropTypes.number.isRequired,
    onPageChanged:PropTypes.func,
}


export default Pager;
