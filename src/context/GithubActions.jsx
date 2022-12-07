import axios from 'axios';

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
});

/** Returns an object with an array of user data and their repo data */
export const getUserWithRepos = async (login) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  });

  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos?${params}`),
  ]);

  return {
    user: user.data,
    repos: repos.data,
  };
};

/** Returns an object for a specific user record */
export const getUser = async (login) => {
  const response = await fetch(`${GITHUB_URL}/users/${login}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });

  if (response.status === 404) {
    window.location = '/notfound';
    return false;
  }

  const data = await response.json();
  return data;
};

/** Returns an array of a users repository records */
export const getUserRepos = async (login) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  });

  const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });
  const data = await response.json();

  return data;
};

/** Returns an array of user records */
export const getUsersSearchResults = async (keywords, page, resultsPerPage) => {
  const params = new URLSearchParams({
    q: keywords,
    page: page || 1,
    per_page: resultsPerPage || 16,
  });

  const response = await github.get(`/search/users?${params}`);

  return response.data;
};
