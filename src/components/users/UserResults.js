import { useContext } from 'react'
import Spinner from '../layouts/Spinner'
import Pager from '../layouts/Pager'
import UserItem from './UserItem'
import GithubContext from '../../context/GithubContext'

function UserResults() {

    const {users, isLoading, fetchUsers, searchInfo, setSearchInfo} = useContext(GithubContext)

    const handlePageChanged = (clickedPageNumber) => {
        fetchUsers(searchInfo.keywords, clickedPageNumber)
        setSearchInfo({
            currentPage: clickedPageNumber
        })
    }

    if(!isLoading) {
        return (
            <div>
                <div className="grid grid-cols-1 mb-20 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                    { users.map((user) => (
                        <UserItem key={user.id} user={user} />
                    ))}
                    
                </div>
                <div className="m-auto text-center">
                    <Pager 
                        totalPages={Math.ceil(searchInfo.totalResults/searchInfo.perPage)}
                        currentPage={searchInfo.currentPage}
                        onPageChanged={(currentPage) => handlePageChanged(currentPage)}
                        className="btn-group"
                    />
                </div>
            </div>
        )
    } else {
        return(<Spinner />)
    }
}

export default UserResults
