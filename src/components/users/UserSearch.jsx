import { useContext, useState } from 'react';
import GithubContext from '../../context/GithubContext';
import AlertContext from '../../context/AlertContext';
import { getUsersSearchResults } from '../../context/GithubActions';

/**
 * UserSearch component.
 * Displays a form which on submit requests search results from the github API.
 */
function UserSearch() {
  const [text, setText] = useState('');

  const { dispatch, users } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);

  /** Set state for form inputs */
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  /** Clear the search data */
  const handleClear = () => {
    dispatch({
      type: 'CLEAR_USERS',
    });

    dispatch({
      type: 'SET_SEARCHINFO',
      payload: {
        currentPage: 1,
        totalResults: 0,
        keywords: '',
      },
    });
  };

  /** Get user search results */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text === '') {
      setAlert('Please enter a search string.', 'error');
    } else {
      dispatch({
        type: 'SET_LOADING',
      });

      const newUsers = await getUsersSearchResults(text);

      dispatch({
        type: 'GET_USERS',
        payload: newUsers.items,
      });

      dispatch({
        type: 'SET_SEARCHINFO',
        payload: {
          keywords: text,
          totalResults: newUsers.total_count,
          currentPage: 1,
        },
      });

      setText('');
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                value={text}
                onChange={handleTextChange}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none btn w-36 btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div className="">
          <button type="submit" onClick={handleClear} className="btn btn-ghost btn-lg">
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
