import UserResults from '../users/UserResults'
import UserSearch from '../users/UserSearch'

/**
 * Home page component.
 */
function Home() {

    return (
        <div>
            <UserSearch />
            <UserResults />
        </div>
    )
}

export default Home
