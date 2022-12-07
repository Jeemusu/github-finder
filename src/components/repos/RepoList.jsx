import PropTypes from 'prop-types';
import RepoItem from './RepoItem';

/**
 * RepoList component.
 * Displays a list of github repository from a passed down prop.
 */
function RepoList({ repos }) {
  return (
    <div className="rounded-lg shadow-lg card bg-base-100">
      <div className="card-body">
        <h2 className="text-3xl my-4 font-bold card-title">
          Latest Repositories
        </h2>
        {repos.map((repo) => (
          <RepoItem key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}

RepoList.propTypes = {
  repos: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    html_url: PropTypes.string,
    forks: PropTypes.number,
    open_issues: PropTypes.number,
    watchers_count: PropTypes.number,
    stargazers_count: PropTypes.number,
  })).isRequired,
};

export default RepoList;
