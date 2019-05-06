import React, {Component} from 'react'
import {fetchCategory} from '../store/closet'
import {connect} from 'react-redux'

export class ClothingItems extends Component {
  componentDidMount() {
    const categoryId = Number(this.props.match.params.categoryId)
    let value = this.props.fetchCategory(categoryId)
  }

  render() {
    const {loading, category} = this.props

    if (loading) return <div>Loading...</div>

    return (
      <div className="allClothes">
        <h2>Hats: </h2>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.closet.loading,
    category: state.category
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategory: categoryId => dispatch(fetchCategory(categoryId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClothingItems)
