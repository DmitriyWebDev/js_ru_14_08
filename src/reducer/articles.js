import { DELETE_ARTICLE, ADD_COMMENT_TO_ARTICLE } from '../constants'
import {normalizedArticles as defaultArticles} from '../fixtures'

export default (articles = defaultArticles, action) => {
    const { type, payload } = action

    switch (type) {

        case DELETE_ARTICLE:
            return articles.filter(article => article.id !== payload.id)

        case ADD_COMMENT_TO_ARTICLE:
            console.log( 'Add comment to article : Reducer' )
            return payload['articles']

    }

    return articles
}