import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { saveComment } from '../../AC'
import {connect} from 'react-redux'
import './style.css'

class CommentForm extends Component {
    static propTypes = {
    };

    state = {
        user: '',
        text: ''
    }



    render() {

        console.log('Form Render')
        console.log(this.props)

        return (
            <form onSubmit = {this.handleSubmit}>
                user: <input value = {this.state.user}
                             onChange = {this.handleChange('user')}
                             className = {this.getClassName('user')} />
                comment: <input value = {this.state.text}
                                onChange = {this.handleChange('text')}
                                className = {this.getClassName('text')} />
                <input type = "submit" value = "submit"/>
            </form>
        )
    }

    handleSubmit = ev => {
        ev.preventDefault()

        console.log( "handleSubmit" )

        const {saveComment, articleId} = this.props
        const {user,text} = this.state

        const data = {
            articleId : articleId,
            id: '',
            user : user,
            text : text
        }

        saveComment(data)

        this.setState({
            user: '',
            text: ''
        })
    }

    getClassName = type => this.state[type].length && this.state[type].length < limits[type].min
        ? 'form-input__error' : ''

    handleChange = type => ev => {
        const {value} = ev.target
        if (value.length > limits[type].max) return
        this.setState({
            [type]: value
        })
    }
}

const limits = {
    user: {
        min: 10,
        max: 20
    },
    text: {
        min: 30,
        max: 100
    }
}

// export default connect(null, (dispatch, ownProps) => ({
//     saveComment: () => dispatch(saveComment(ownProps))
// }))(CommentForm)

export default connect(null, { saveComment })(CommentForm)