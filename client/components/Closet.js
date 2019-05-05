import React, { Component } from 'react'
import {fetchCategory} from '../store/closet'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export class Closet extends Component {
    componentDidMount() {
        this.props.fetchCategory()
    }

    render() {
        const category = this.props.category
        return (
        <div id="closet-details">
            {
                category.map(product =>
                    (<div id="closetpics" key={product.id}>
                        {product.image}
                     </div>))
            }
        </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        category: state.category
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategory: () => dispatch(fetchCategory()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Closet)