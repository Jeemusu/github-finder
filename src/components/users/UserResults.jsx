import { useContext } from 'react';
import Spinner from '../layouts/Spinner';
import Pager from '../layouts/Pager';
import UserItem from './UserItem';
import GithubContext from '../../context/GithubContext';
import { getUsersSearchResults } from '../../context/GithubActions';

/**
 * UserResults component.
 * Displays a paginated list of github user profiles from data pulled from global context.
 */
function UserResults() {
  const {
    dispatch,
    users,
    isLoading,
    searchInfo
  } = useContext(GithubContext);

  const handlePageChanged = async (clickedPageNumber) => {
    dispatch({
      type: 'SET_LOADING',
    });

    const newUsers = await getUsersSearchResults(
      searchInfo.keywords,
      clickedPageNumber
    );
    // MADE BIG CHANGE HERE CHECK IT
    dispatch({
      type: 'GET_USERS',
      payload: newUsers.items,
    });

    dispatch({
      type: 'SET_SEARCHINFO',
      payload: {
        currentPage: clickedPageNumber,
      },
    });
  };

  const totalPages = Math.ceil(searchInfo.totalResults / searchInfo.perPage);

  if (!isLoading) {
    return (
      <div>
        {users.length > 0 ? (
          <div className="grid grid-cols-1 mb-20 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
            {users.map((user) => (
              <UserItem key={user.id} user={user} />
            ))}
          </div>
        ) : (
          searchInfo.keywords && (
            <p>
              {
              `No results found for
               $(searchInfo.keywords)`
              }
            </p>
          )
        )}
        <div className="m-auto text-center">
          <Pager
            totalPages={totalPages}
            currentPage={searchInfo.currentPage}
            onPageChanged={(currentPage) => handlePageChanged(currentPage)}
            className="btn-group"
          />
        </div>
      </div>
    );
  }

  return <Spinner />;
}

export default UserResults;
