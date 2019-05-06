import React, { Component } from 'react'
import {fetchCategories} from '../store/closet'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export class Closet extends Component {
    componentDidMount() {
        this.props.fetchCategories()
    }

    render() {
        const {loading, categories} = this.props

        if(loading) return <div>Loading...</div>
        return (
        <div id="closet-details">
            <h1 id='closeth1'>BEYONCÉ CLOSET</h1>
            {/* {
                categories.map(category =>
                    (<div id="closetpics" key={category.id}>
                        {category.image}
                     </div>))
            } */}
        </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        loading: state.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => dispatch(fetchCategories()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Closet)