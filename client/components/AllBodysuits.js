import React, { Component } from 'react'
import {fetchCategoryFromCloset} from '../store/closet'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


export class AllBodysuits extends Component {
    componentDidMount() {
        const id =  Number(this.props.match.params.id)
         this.props.fetchCategoryFromCloset(id)
    }

    render() {
        const {loading, category} = this.props

        if(loading) return <div>Loading...</div>

        return(
            <div className='allBodysuits'>
                        <h2>Bodysuits: </h2>
                        {
                            category.map(item =>
                                <div id="bodysuitpics" key={item.id}>
                                    <img src={item.filePath} /> 
                                </div>
                            )
                        }
            </div>    
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        category: state.category
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategoryFromCloset: (categoryId) => dispatch(fetchCategoryFromCloset(categoryId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllBodysuits)