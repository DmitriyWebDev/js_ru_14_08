import { ADD_COMMENT, LOAD_COMMENTS_FOR_ARTICLE, SUCCESS, START } from '../constants'
import {normalizedComments} from '../fixtures'
import {arrToMap} from './utils'
import {OrderedMap,Record} from 'immutable'

const CommentRecord = Record({
    id: '',
    user: '',
    text: ''
})

const ReducerRecord = Record({
    entities: OrderedMap( {} ),
    loading: false,
    loaded: false
})

const defaultState = new ReducerRecord()

export default (state = defaultState, action) => {
    const { type, payload, randomId, response } = action

    switch (type) {
        case ADD_COMMENT:

            const newComment = CommentRecord( payload.comment ).set( 'id', randomId )

            return state.setIn(['entities', randomId], newComment)

            // return {...state, [randomId]: {
            //     ...payload.comment,
            //     id: randomId
            // }}

        case LOAD_COMMENTS_FOR_ARTICLE + SUCCESS:

            console.log( 'LOAD Comments SUCCESS' )

            const ArticleComments = response['records']
            console.log( ArticleComments )


            return state.mergeIn( ['entities'], arrToMap( ArticleComments, CommentRecord ) );

    }

    return state
}