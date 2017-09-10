import React, { Component, PropTypes } from 'react'
import Select from 'react-select'
import {connect} from 'react-redux'
import { changeSelectedArticlesInSelectFilter } from '../../AC'

import 'react-select/dist/react-select.css'

class SelectFilter extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired
    };

    handleSelectionChange = selected => {
        const { changeSelectedArticlesInSelectFilter } = this.props
        changeSelectedArticlesInSelectFilter(selected)
    }

    render() {
        const { articles } = this.props
        const options = articles.map(article => ({
            label: article.title,
            value: article.id
        }))

        return <Select
            options={options}
            value={this.props.selected}
            onChange={this.handleSelectionChange}
            multi
        />
    }
}

let mapStateToProps = state => {
    return {
        articles : state.selectArticles,
        selected : state.filterSelectedArticlesInSelect
    }
}

export default connect(
    mapStateToProps,
    { changeSelectedArticlesInSelectFilter }
)(SelectFilter)
