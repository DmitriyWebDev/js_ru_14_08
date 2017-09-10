import {INCREMENT, DELETE_ARTICLE, CHANGE_SELECT_FILTER, CHANGE_DATE_RANGE_FILTER} from '../constants'

export function increment() {
    return {
        type: INCREMENT
    }
}

export function deleteArticle(id) {
    return {
        type: DELETE_ARTICLE,
        payload: { id }
    }
}

export function changeSelectedArticlesInSelectFilter(selectedArticles) {
    return {
        type: CHANGE_SELECT_FILTER,
        payload: { selectedArticles }
    }
}

export function changeDateRangeFilter(dateRange) {
    return {
        type: CHANGE_DATE_RANGE_FILTER,
        payload: { dateRange }
    }
}