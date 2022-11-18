import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext() 

export const GithubProvider = ({children}) => {

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
            perPage: 16
        }
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    return (
        <GithubContext.Provider
            value={{ 
                ...state,
                dispatch
            }}
        >
            {children}
        </GithubContext.Provider>
    )
}

export default GithubContext