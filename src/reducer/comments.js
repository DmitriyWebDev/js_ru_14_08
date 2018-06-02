import { ADD_COMMENT } from '../constants'
import {normalizedComments} from '../fixtures'
import {arrToMap} from './utils'
import {OrderedMap,Record} from 'immutable'

const CommentRecord = Record({
    id: '',
    user: '',
    text: ''
})

const ReducerRecord = Record({
    entities: OrderedMap( arrToMap(normalizedComments, CommentRecord) ),
    loading: false,
    loaded: false
})

const defaultState = new ReducerRecord()

export default (state = defaultState, action) => {
    const { type, payload, randomId } = action

    switch (type) {
        case ADD_COMMENT:

            const newComment = CommentRecord( payload.comment ).set( 'id', randomId )

            return state.setIn(['entities', randomId], newComment)

            // return {...state, [randomId]: {
            //     ...payload.comment,
            //     id: randomId
            // }}
    }

    return state
}