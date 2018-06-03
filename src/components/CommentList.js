import React, {Component} from 'react'
import Comment from './Comment'
import toggleOpen from '../decorators/toggleOpen'
import CommentForm from './CommentForm'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { loadCommentsByArticleId } from '../AC'
import Loader from './Loader'

class CommentList extends Component {
    static defaultProps = {
        article: PropTypes.object.isRequired,
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    }

    componentWillReceiveProps(newProps) {


        const { isOpen, article, loadComments } = newProps
        console.log( 'CommentList new props' )
        console.log( article )
        console.log( article.commentsIsLoading )
        console.log( article.commentsIsLoaded )

        if( !this.props.isOpen && isOpen && !article.commentsIsLoading && !article.commentsIsLoaded ) {
            loadComments( article.id );
        }

    }

    render() {
        const {isOpen, toggleOpen} = this.props
        const text = isOpen ? 'hide comments' : 'show comments'
        return (
            <div>
                <button onClick={toggleOpen}>{text}</button>
                {this.getBody()}
            </div>
        )
    }

    getBody() {
        const { article: {id, comments = [], commentsIsLoading, commentsIsLoaded}, isOpen } = this.props
        if (!isOpen) return null

        if (commentsIsLoading) return <Loader/>

        if (!commentsIsLoaded) return null


        const body = comments.length ? (
            <ul>
                {comments.map(id => <li key = {id}><Comment id = {id} /></li>)}
            </ul>
        ) : <h3>No comments yet</h3>

        return (
            <div>
                {body}
                <CommentForm articleId = {id} />
            </div>
        )
    }
}


//export default toggleOpen(CommentList)

export default connect(null, (dispatch, ownProps) => ({
    loadComments: () => dispatch(loadCommentsByArticleId(ownProps.article.id))
}))(toggleOpen(CommentList))

//export default connect(null, { loadComments })(toggleOpen(CommentList))