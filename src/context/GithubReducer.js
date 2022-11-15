const githubReducer = (state, action) => {
    switch(action.type) {
        case 'GET_USERS':
            // return a new state object with the users and loading flag
            return {
                ...state,
                users: action.payload,
                isLoading: false
            }
        default:
            return state
    }
}

export default githubReducer