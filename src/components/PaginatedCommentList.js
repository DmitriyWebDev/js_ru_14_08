import React, {Component} from 'react'
import Comment from './Comment'
import CommentsPagination from './CommentsPagination'
import Loader from './Loader'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {loadPaginatedComments} from '../AC'
import {Link, Route, Redirect, Switch} from 'react-router-dom'

class PaginatedCommentList extends Component {

    static defaultProps = {

    }

    componentWillMount() {

        console.log('PaginatedCommentList Will Mount')
        console.log(this.props)

        const {paginationDataReceived, pageNumber, loadPaginatedComments, paginationPagesData} = this.props

        if( !paginationDataReceived || !paginationPagesData.get( pageNumber ).commentsIds ) {
            loadPaginatedComments( true, pageNumber );
        }

    }

    componentWillReceiveProps( newProps ) {

        const {pagesCount, pageNumber, loadPaginatedComments} = newProps;

        if( parseInt(pageNumber) <= pagesCount ) {
            loadPaginatedComments( false, pageNumber );
        }

    }

    render() {

        return (
            <div>
                {this.getBody()}
            </div>
        )
    }

    getBody() {

        const {
            pagesCount,
            rootUrl,
            paginationDataReceived,
            paginationPagesData,
            pageNumber
        } = this.props

        let pages = [];

        if( pagesCount ) {

            for( let i = 0; i < pagesCount; i++ ) {
                const obj = {
                    number : i + 1,
                    path: rootUrl + '/' + (i + 1)
                }
                pages.push( obj );
            }
        }

        console.log('PaginatedCommentList Render PROPS')
        console.log( this.props )

        if( parseInt(pageNumber) > pagesCount ) {

            return (
                <div>
                    <h3>No comments found</h3>
                    <CommentsPagination pages={pages} />
                </div>
            )

        }

        if( !paginationDataReceived ) return <Loader />

        if( typeof paginationPagesData.get( pageNumber ) === 'undefined' ) return <Loader />

        if( !paginationPagesData.get( pageNumber ).commentsIds ) return <Loader />

        let comments = paginationPagesData.get( pageNumber ).commentsIds
        comments = (comments || comments.length) ? comments : []

        const body = comments.length ? (
            <ul>
                {comments.map(id => <li key = {id}><Comment id = {id} /></li>)}
            </ul>
        ) : <h3>No comments found</h3>

        //const body = <Link to={`${rootUrl}/2`}>{`${rootUrl}/2`}</Link>





        return (
            <div>
                <h3> Comments list ( page {this.props.pageNumber} ) </h3>
                {body}
                <CommentsPagination pages={pages} />
            </div>
        )
    }
}

export default connect(state => {
    return {
        paginationDataReceived : state.paginatedCommentsData.paginationDataReceived,
        paginationPagesData    : state.paginatedCommentsData.paginationPagesData,
        pagesCount             : state.paginatedCommentsData.pagesCount,
    }
}, {loadPaginatedComments})(PaginatedCommentList)

