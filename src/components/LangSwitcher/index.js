import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {getTranslatedText} from '../../reducer/utils'

class LangSwitcher extends Component {
    static propTypes = {

    };

    static contextTypes = {
        lang: PropTypes.string,
        dictionary: PropTypes.object
    }

    render() {
        console.log('Switcher context', this.context)
        const {dictionary, lang} = this.context
        return (
            <div>

                <h2>{getTranslatedText('Change Language', dictionary, lang )}</h2>

                <button onClick={this.changeLang}>
                    {this.props.currentLang === 'en' ? 'RU' : 'EN' }
                </button>

            </div>
        )
    }

    changeLang = () => {

        let lang = this.props.currentLang

        if( lang === 'en' ) {
            lang = 'ru'
        } else {
            lang = 'en'
        }

        console.log( 'New lang' )
        console.log( lang )

        this.props.handleUserLanguage(lang)
    }

}

export default LangSwitcher
