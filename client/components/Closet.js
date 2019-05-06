import React, { Component } from 'react'
import {fetchCategories} from '../store/closet'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export class Closet extends Component {
    componentDidMount() {
        console.log("BEFORE MOUNT")
        this.props.fetchCategories()
        console.log("DONE WITH MOUNT")
    }

    render() {
        const {loading, categories} = this.props
        console.log("LOADING", loading)

        if(loading) return <div>Loading...</div>
        
        console.log("CATEGORIES.DATA", categories.data)

        return (
        <div id="closet-details">
            <h1 id='closeth1'>BEYONCÉ CLOSET</h1>
            {/* {
                categories.map(category =>
                    (<div id="closetpics" key={category.id}>
                        <img src={category.image} />
                        <Link  to={`/category/${category.id}`}></Link>
                     </div>))
            } */}
        </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        loading: state.closet.loading,
        categories: state.closet.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => dispatch(fetchCategories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Closet)