import { SAVE_COMMENT } from '../constants'
import {normalizedComments} from '../fixtures'

const defaultComments = normalizedComments.reduce((acc, comment) => ({
    ...acc,
    [comment.id]: comment
}), {})

export default (state = defaultComments, action) => {
    const { type, payload, response, error } = action

    switch (type) {

        case SAVE_COMMENT:
            return payload['newComments']

    }

    return state
}