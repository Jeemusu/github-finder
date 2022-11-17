import { useEffect, useContext } from 'react'
import GithubContext from '../../context/GithubContext'
 import { useParams } from 'react-router-dom'
function User() {

    const params = useParams()

    const { getUser, user } = useContext(GithubContext)

    useEffect(() => {
        getUser(params.login)
    }, [])

    return (
        <div>
            {user.name}
        </div>
    );
}

export default User;
