import { LOAD_PAGINATION_PAGE_COMMENTS, LOAD_PAGINATION_PAGE_COMMENTS_CACHE, SUCCESS, FAIL } from '../constants'
import {arrToMap} from './utils'
import {Map, Record, fromJS} from 'immutable'

const PaginationPageRecord = Record({
    pageNumber     : null,
    commentsLoaded : false,
    commentsIds    : []
})

const ReducerState = Record({
    paginationDataReceived : false,
    paginationPagesData    : new Map(),
    currentPage            : "1",
    pagesCount             : 0
})


export default (state = new ReducerState(), action) => {
    const { type, payload, response } = action

    switch (type) {

        case LOAD_PAGINATION_PAGE_COMMENTS + SUCCESS:

            let {pageNumber, commentsPageLimit, isInit} = payload
            const {total, records} = response
            let commentsIds = []

            for (let comment of records) {
                commentsIds.push( comment['id'] )
            }




            const pageObj = {
                pageNumber     : pageNumber,
                commentsLoaded : true,
                commentsIds    : commentsIds
            }

            if( isInit ) {

                const count = getPagesCount(total, commentsPageLimit)
                const paginationPagesObj = createPaginationObjShape(count);

                return state
                    .setIn(['paginationDataReceived'], true)
                    .setIn(['paginationPagesData'], paginationPagesObj)
                    .setIn(['currentPage'], pageNumber)
                    .setIn(['pagesCount'], count)
                    .setIn(['paginationPagesData', pageNumber], PaginationPageRecord(pageObj))

            } else if( !isInit && !state.getIn(['paginationPagesData', pageNumber]).size ) {

                return state
                    .setIn(['currentPage'], pageNumber)
                    .setIn(['paginationPagesData', pageNumber], PaginationPageRecord(pageObj))

            }

            return state

        case LOAD_PAGINATION_PAGE_COMMENTS + FAIL:

            alert( 'Comment pagination error.' )
            return state
    }

    return state
}

function getPagesCount(total, limit) {

    let count = Math.floor((total/limit))

    if( total - ( limit * count ) > 0 ) {
        count++;
    }

    return count

}

function createPaginationObjShape(count) {

    const shape = {};

    for( let i = 0; i < count; i++ ) {
        shape[i + 1] = {};
    }

    return fromJS(shape)

}