import {combineReducers} from 'redux'
import counterReducer from './counter'
import articles from './articles'
import selectArticles from './selectArticles'
import filterSelectedArticlesInSelect from './filterSelectedArticlesInSelect'
import filterSelectedDateRangeInCalendar from './filterSelectedDateRangeInCalendar'

export default combineReducers({
    counter: counterReducer,
    articles,
    selectArticles,
    filterSelectedArticlesInSelect,
    filterSelectedDateRangeInCalendar
})