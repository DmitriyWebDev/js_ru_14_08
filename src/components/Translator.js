import React, {Component, PropTypes} from 'react'

export default class Translator extends Component {

    state = {
        currentLang: 'en'
    }

    static childContextTypes = {
        lang: PropTypes.string,
        dictionary: PropTypes.object,
    }

    getChildContext() {

        const translations = {
            "delete me" : {
                "ru" : "удалить меня"
            },
            "show comments" : {
                "ru" : "показать комментарии"
            },
            "hide comments" : {
                "ru" : "скрыть комментарии"
            },
            "Menu" : {
                "ru" : "Меню"
            },
            "Change Language" : {
                "ru" : "Сменить язык"
            },
            "News App" : {
                "ru" : "Новостное приложение"
            },
            "Loading..." : {
                "ru" : "Загрузка..."
            },
            "User" : {
                "ru" : "Пользователь"
            },
        }

        console.log( translations )

        return {
            lang: this.state.currentLang,
            dictionary: translations
        }
    }

    render() {

        console.log( 'Translator', this.props )

        return (
            <div>
                {
                    React.cloneElement( this.props.children, { handleUserLanguage : this.handleUserLanguage } )
                }
            </div>
        )

    }

    handleUserLanguage = (currentLang) => this.setState({ currentLang })

}