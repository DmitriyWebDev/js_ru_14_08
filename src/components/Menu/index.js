import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MenuItem from './MenuItem'
import {getTranslatedText} from '../../reducer/utils'

class Menu extends Component {
    static propTypes = {

    };

    static contextTypes = {
        user: PropTypes.string,
        lang: PropTypes.string,
        dictionary: PropTypes.object
    }

    render() {

        const {dictionary, lang} = this.context

        return (
            <div>
                <h2>{getTranslatedText('User', dictionary, lang )}: {this.context.user}</h2>
                <h3>{getTranslatedText('Menu', dictionary, lang )}:</h3>
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export { MenuItem }
export default Menu