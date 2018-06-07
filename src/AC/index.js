import {
    INCREMENT, DELETE_ARTICLE, CHANGE_DATE_RANGE, CHANGE_SELECTION, ADD_COMMENT, LOAD_ALL_ARTICLES, LOAD_ARTICLE,
    LOAD_ARTICLE_COMMENTS, LOAD_PAGINATION_PAGE_COMMENTS, START, SUCCESS, FAIL
} from '../constants'

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

export function addComment(comment, articleId) {
    return {
        type: ADD_COMMENT,
        payload: { comment, articleId },
        generateId: true
    }
}

export function loadAllArticles() {
    return {
        type: LOAD_ALL_ARTICLES,
        callAPI: '/api/article'
    }
}

/*
export function loadArticleById(id) {
    return {
        type: LOAD_ARTICLE,
        callAPI: `/api/article/${id}`
    }
}*/
export function loadArticleComments(articleId) {
    return {
        type: LOAD_ARTICLE_COMMENTS,
        payload: { articleId },
        callAPI: `/api/comment?article=${articleId}`
    }
}

export function loadPaginatedComments( getInitialData = false, pageNumber = 1 ) {


    console.log( 'loadPaginatedComments()' )

    const commentsPageLimit  = 5
    const offset = (pageNumber - 1) * commentsPageLimit
    const isInit = getInitialData

    if( getInitialData ) {

        return {
            type: LOAD_PAGINATION_PAGE_COMMENTS,
            payload: { pageNumber, commentsPageLimit, isInit },
            callAPI: `/api/comment?limit=${commentsPageLimit}&offset=${offset}`
        }

    } else {

        console.log( 'Init data exists. Get comments from Cache or Api' )

        return (dispatch, getState) => {

            const commentPageLoaded = getState().paginatedCommentsData.paginationPagesData.get( pageNumber )
            if (commentPageLoaded && commentPageLoaded.commentsIds) {
                console.log( 'USE COMMENTS CACHE' )
                return false
            }

            console.log( 'CALL COMMENTS API' )

            dispatch({
                type: LOAD_PAGINATION_PAGE_COMMENTS,
                payload: { pageNumber, commentsPageLimit, isInit },
                callAPI: `/api/comment?limit=${commentsPageLimit}&offset=${offset}`
            })

        }

    }

}

export function loadArticleById(id) {
    return (dispatch, getState) => {
        const article = getState().articles.entities.get(id)
        if (article && article.text) return

        dispatch({
            type: LOAD_ARTICLE + START,
            payload: { id }
        })

        setTimeout(() => {
            fetch(`/api/article/${id}`)
                .then(res => res.json())
                .then(response => dispatch({
                    type: LOAD_ARTICLE + SUCCESS,
                    payload: { id },
                    response
                }))
                .catch(error => dispatch({
                    type: LOAD_ARTICLE + FAIL,
                    payload: { id },
                    error
                }))
        }, 1000)
    }
}