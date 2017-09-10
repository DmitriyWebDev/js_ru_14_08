import { CHANGE_SELECT_FILTER } from '../constants'

export default (selectedArticles = null, action) => {
    const { type, payload } = action

    switch (type) {
        case CHANGE_SELECT_FILTER:
            if( typeof payload.selectedArticles.length !== 'undefined' ) {
                return payload.selectedArticles
            }
    }

    return selectedArticles
}