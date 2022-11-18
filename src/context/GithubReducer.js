const githubReducer = (state, action) => {
    switch(action.type) {
        case 'CLEAR_USERS':
            return {
                ...state,
                users: []
            }
        case 'GET_USER':
            return {
                ...state,
                user: action.payload,
                isLoading: false
            }
        case 'GET_USER_AND_REPOS':
            return {
                ...state,
                user: action.payload.user,
                repos: action.payload.repos,
                isLoading: false
            }
        case 'GET_USERS':
            return {
                ...state,
                users: action.payload,
                isLoading: false
            }
        case 'GET_USER_REPOS':
            return {
                ...state,
                repos: action.payload,
                isLoading: false
            }
        case 'SET_SEARCHINFO':
            return {
                ...state,
                searchInfo: {
                    ...state.searchInfo,
                    ...action.payload
                }
            }
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: true
            }
        default:
            return state
    }
}

export default githubReducer