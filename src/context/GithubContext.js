import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext() 

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {

    // Create initial state
    const initialState = {
        users: [],
        isLoading: false,
        search: {
            keywords: '',
            currentPage: 1,
            totalResults: 0,
            perPage: 16
        }
    }

    // Use a reducer instead of useState
    const [state, dispatch] = useReducer(githubReducer, initialState)

    const setSearchInfo = (searchInfo) => {
        dispatch({
            type: 'SET_SEARCH',
            payload: {
                ...state.search,
                ...searchInfo
            }
        })
    }

    const clearUsers = () => {
        dispatch({
            type: 'CLEAR_USERS',
            
        })
    }

    // Fetch search result data from backend
    const searchUsers = async (text, page) => {

        setLoading()

        const params = new URLSearchParams({
            q: text,
            page: page ? page : 1,
            per_page: state.search.perPage
        })

        const response = await fetch(
            `${GITHUB_URL}/search/users?${params}`, 
            {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`
                }
            }
        )
        const data = await response.json()
        
        // TODO when we search for users we dont pass in the current page so it's always set to 1?
        dispatch({
            type: 'SET_SEARCH',
            payload: {
                keywords: text,
                totalResults: data.total_count,
            }
        })

        // Instead of using setXYZ to set the global state we can dispatch
        dispatch({
            type: 'GET_USERS',
            payload: data.items
        })
    }

    
    const setLoading = () => {
        dispatch({
            type: 'SET_LOADING'
        })
    }

    return (
        <GithubContext.Provider
            value={{ 
                users: state.users,
                isLoading: state.isLoading,
                search: state.search,
                searchUsers: searchUsers,
                setLoading: setLoading,
                setSearchInfo: setSearchInfo,
                clearUsers: clearUsers
            }}
        >
            {children}
        </GithubContext.Provider>
    )
}

export default GithubContext