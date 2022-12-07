import { createContext, useReducer, useMemo } from 'react';
import { PropTypes } from 'prop-types';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

export function GithubProvider({ children }) {
  // Create initial state
  const initialState = {
    users: [],
    user: {},
    repos: [],
    isLoading: false,
    searchInfo: {
      keywords: '',
      currentPage: 1,
      totalResults: 0,
      perPage: 16,
    },
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const value = useMemo(() => ({
    ...state,
    dispatch,
  }), [
    state,
    dispatch
  ]);

  return (
    <GithubContext.Provider
      value={value}
    >
      {children}
    </GithubContext.Provider>
  );
}

GithubProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GithubContext;
