import React, { Component } from 'react'
import {fetchCategoryFromCloset} from '../store/closet'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


export class AllHats extends Component {
    componentDidMount() {
        const id =  Number(this.props.match.params.id)
         this.props.fetchCategoryFromCloset(id)
    }

    render() {
        const {loading, category} = this.props

        if(loading) return <div>Loading...</div>

        return(
            <div className='allHats'>
                        <h2>Hats: </h2>
                        {
                            category.map(item =>
                                <div id="hatpics" key={item.id}>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllHats)