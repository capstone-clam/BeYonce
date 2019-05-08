import React, {Component} from 'react'
import {fetchCategories} from '../store/closet'
import {connect} from 'react-redux'

import Category from './Category'
import ClothingItems from './ClothingItems'

class Closet extends Component {
  constructor() {
    super()
    this.state = {
      selectedCategoryId: ''
    }
    this.pickCategory = this.pickCategory.bind(this)
  }
  componentDidMount() {
    this.props.fetchCategories()
  }

  pickCategory(categoryId) {
    return this.setState({
      selectedCategoryId: categoryId
    })
  }

  deslectCategory() {
    this.setState({
      selectedCategoryId: ''
    })
  }

  render() {
    const {categories, loadingCategories} = this.props

    if (loadingCategories) return <div>Loading...</div>

    return (
      <div id="closet-details">
        <h1 id="closeth1">BEYONCÉ CLOSET</h1>
        <p id="closetp">Please choose up to one of each</p>

        {this.state.selectedCategoryId ? (
          <ClothingItems categoryId={this.state.selectedCategoryId} />
        ) : (
          <Category categories={categories} pickCategory={this.pickCategory} />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loadingCategories: state.closet.loadingCategories,
    categories: state.closet.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Closet)
