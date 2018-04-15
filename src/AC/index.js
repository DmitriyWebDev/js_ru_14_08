import {INCREMENT, DELETE_ARTICLE, CHANGE_DATE_RANGE, CHANGE_SELECTION, SAVE_COMMENT, ADD_COMMENT_TO_ARTICLE} from '../constants'

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

export function changeDateRange(dateRange) {
    return {
        type: CHANGE_DATE_RANGE,
        payload: { dateRange }
    }
}

export function changeSelection(selected) {
    return {
        type: CHANGE_SELECTION,
        payload: { selected }
    }
}

export function saveComment(commentData) {

    console.log( 'AC saveComment()' )
    console.log( commentData )

    return {
        type: SAVE_COMMENT,
        payload: {
            articleId: commentData['articleId'],
            id : '',
            user: commentData['user'],
            text: commentData['text']
        }
    }
}

export function addCommentToArticle(articlesWithNewComment) {
    return {
        type: ADD_COMMENT_TO_ARTICLE,
        payload: {
            articles : articlesWithNewComment
        }
    }
}
