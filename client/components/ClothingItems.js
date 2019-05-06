import React, { Component } from 'react'
import {fetchCategory} from '../store/closet'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


export class ClothingItems extends Component {
    componentDidMount() {
        // const id =  Number(this.props.match.params.id)
        const id= this.props.id
         this.props.fetchCategory(id)
    }

    render() {
        const {loading, category} = this.props
        console.log("CATEGORY", category)
        const inventories = category.inventories
        console.log("INVENTROIES", inventories)
        console.log("PROPS", this.props)

        if(loading) return <div>Loading...</div>

        return(
            <div className='allClothes'>
                        <h2>Hats: </h2>
                        {
                            inventories.map(item =>
                                <div id="clothespics" key={item.id}>
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
        loading: state.closet.loading,
        category: state.closet.category
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategory: (categoryId) => dispatch(fetchCategory(categoryId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClothingItems)