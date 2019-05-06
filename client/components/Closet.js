import React, { Component } from 'react'
import {fetchCategories} from '../store/closet'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import ClothingItems from './ClothingItems'

export class Closet extends Component {
    constructor(){
        super()
        this.state = {
            showClothingItem: false
        }
        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount() {
        console.log("BEFORE MOUNT")
        this.props.fetchCategories()
        console.log("DONE WITH MOUNT")
    }
    handleClick(){
        return this.setState({
            showClothingItem: !(this.state.showClothingItem)
        })
    }

    render() {
        const {loading, categories} = this.props
        console.log("LOADING", loading)

        if(loading) return <div>Loading...</div>
        
        console.log("CATEGORIES", categories)

        return (
        <div id="closet-details">
            <h1 id='closeth1'>BEYONCÉ CLOSET</h1>
            <p id='closeth1'>Please choose up to one of each</p>
            {
                categories.map(category =>
                    (<div id="closetpics" key={category.id}>
                        <div id="singlepic">
                        <img id="closetpics" src={category.image}  onClick= {this.handleClick}/>
                        {this.state.showClothingItem ? <ClothingItems id={category.id} categoryName={category.name}/>: null}
                        </div>
                      </div>))
            }
        </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        loading: state.closet.loading,
        categories: state.closet.categories,
        // loading: state.loading,
        // categories: state.categories,
        // categoryName: state.closet.closet
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => dispatch(fetchCategories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Closet)