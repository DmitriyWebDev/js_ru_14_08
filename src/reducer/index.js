import {combineReducers} from 'redux'
import counterReducer from './counter'
import articles from './articles'
import comments from './comments'
import filters from './filters'
import paginatedCommentsData from './paginatedCommentsData'

export default combineReducers({
    counter: counterReducer,
    articles,
    comments,
    paginatedCommentsData,
    filters
})