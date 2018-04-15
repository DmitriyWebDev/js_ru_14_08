import { SAVE_COMMENT, ADD_COMMENT_TO_ARTICLE } from '../constants'
import {addCommentToArticle} from '../AC'

export default store => next => action => {

    const {type} = action

    if( type === SAVE_COMMENT ) {

        //console.log( '+++', 'Save Comment Middleware - start' )

        const {articleId} = action['payload'];


        const oldComments = store.getState()['comments'];
        const newComments = Object.assign({}, oldComments);
        const newCommentId = makeid( oldComments );

        newComments[`${newCommentId}`] = {
            id: newCommentId,
            user: action['payload']['user'],
            text: action['payload']['text']
        }

        action['payload'] = {
            newComments : newComments
        }

        next(action)


        const oldArticles = store.getState()['articles']
        const newArticles = []

        console.log( articleId )

        for( let key in oldArticles ) {

            if( !oldArticles.hasOwnProperty(key) ) continue

            let article = oldArticles[key]

            if( article['id'] === articleId ) {
                article = Object.assign({}, oldArticles[key])
                article['comments'].push(newCommentId)
            }

            newArticles.push(article)

        }

        store.dispatch(addCommentToArticle(newArticles));

        //console.log( '+++', 'Save Comment Middleware - end' )

        return false;

    }

    next(action)




    // Functions

    function makeid( commentsObj ) {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 24; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length))

        if( typeof commentsObj[`${text}`] === 'undefined' ) {
            return text;
        } else {
            makeid( commentsObj )
        }
    }

}
