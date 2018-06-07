import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class CommentsPagination extends Component {

    static defaultProps = {

    }

    render() {

        return (
            <div>
                {this.getBody()}
            </div>
        )
    }

    getBody() {

        const { pages } = this.props

        console.log( "PAGES" )
        console.log( pages )

        const body = pages.length ? (
            <ul>
                {pages.map(item => <li key = {item.number}><Link to={`${item.path}`}>{item.number}</Link></li>)}
            </ul>
        ) : <h3></h3>

        return (
            <div>
                {body}
            </div>
        )

    }
}

export default CommentsPagination

