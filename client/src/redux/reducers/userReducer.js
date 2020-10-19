const initialState = {
    user: {},
    isAuthenticated: false,
    loader: false,
    success: false
}



const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_LOADER":
            return {
                ...state,
                loader: action.payload
            }
        case "SET_USERS_DATA":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loader: false,
                success: true
            }
        case "DELETE_USERS_DATA":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: false,
                success: false
            }
        default:
            return state
    }
}

export default userReducer