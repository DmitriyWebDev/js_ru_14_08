import React, {Component, PropTypes} from 'react'
import {getTranslatedText} from '../reducer/utils'

export default class Loader extends Component {

    static contextTypes = {
        lang: PropTypes.string,
        dictionary: PropTypes.object
    }

    render() {

        const {dictionary, lang} = this.context

        return (
            <h2>
                {getTranslatedText('Loading...', dictionary, lang )}
            </h2>
        )

    }

}
