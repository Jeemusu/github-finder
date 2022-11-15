import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext() 

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {

    // Create initial state
    const initialState = {
        users: [],
        isLoading: true
    }

    // Use a reducer instead of useState
    const [state, dispatch] = useReducer(githubReducer, initialState)

    // Fetch data from backend
    const fetchUsers = async () => {
        const response = await fetch(
            `${GITHUB_URL}/users`, 
            {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`
                }
            }
        )

        const data = await response.json()
        
        // Instead of using setXYZ to set the global state we can dispatch
        dispatch({
            type: 'GET_USERS',
            payload: data
        })
    }

    return (
        <GithubContext.Provider
            value={{ 
                users: state.users,
                isLoading: state.isLoading,
                fetchUsers: fetchUsers
            }}
        >
            {children}
        </GithubContext.Provider>
    )
}

export default GithubContext