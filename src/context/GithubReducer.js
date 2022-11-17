const githubReducer = (state, action) => {
    switch(action.type) {
        case 'CLEAR_USERS':
            return {
                ...state,
                users: []
            }
        case 'GET_USERS':
            return {
                ...state,
                users: action.payload,
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