import React, { Component } from 'react'
import PaginatedCommentList from '../PaginatedCommentList'
import {Route, Redirect, Switch} from 'react-router-dom'

class CommentPage extends Component {
    static propTypes = {

    };

    render() {

        return (
            <div>
                <h1> Comments </h1>
                <Switch>
                    <Route exact path={this.props.match.path} render={() => <Redirect to={this.props.match.path + '/1'} />} />
                    <Route path={`${this.props.match.path}/:pageNumber`} children={this.paginatedCommentList}/>
                </Switch>

            </div>
        )
    }

    paginatedCommentList = ({match}) => {
        const rootUrl = match.url.split( '/' + match.params.pageNumber )[0];
        return <PaginatedCommentList rootUrl={rootUrl} pageNumber={match.params.pageNumber} />
    }

}

export default CommentPage