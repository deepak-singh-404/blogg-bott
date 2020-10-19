import { combineReducers } from 'redux';
import blogReducer from './blogReducer'
import userReducer from './userReducer'
import errorReducer from './errorReducer'


export default combineReducers({
    userRoot: userReducer,
    blogRoot: blogReducer,
    errorRoot: errorReducer
});