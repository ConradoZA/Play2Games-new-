const initialState = {
    user: {}
}

const userReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'LOGOUT':
        case 'DELETE_USER':
            return {
                ...state,
                user: {}
            }
        case 'LOGIN':
        case 'GET_DETAIL':
        case 'UPDATE_USER':
        case 'UPLOAD_IMAGE':
            return {
                ...state,
                user: action.payload
            }
        case 'GET_ALL_USERS':
            return {
                ...state,
                users: action.payload
            }
        default:
            return state;
    }
};
export default userReducer;