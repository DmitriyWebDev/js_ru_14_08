import React, {Component} from 'react'
import Translator from './components/Translator'
import Root from './components/Root'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'
import store from './store'
import history from './history'

export default class App extends Component {
    render() {
        return (
            <Provider store = {store}>
                <ConnectedRouter history = {history}>
                    <Translator>
                        <Root />
                    </Translator>
                </ConnectedRouter>
            </Provider>
        )

    }
}