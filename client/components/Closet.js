import React, {Component} from 'react'
import {fetchCategories} from '../store/closet'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import Category from './Category'
import ClothingItems from './ClothingItems'

class Closet extends Component {
  constructor() {
    super()
    this.state = {}
    this.pickCategory = this.pickCategory.bind(this)
    this.deslectCategory = this.deslectCategory.bind(this)
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
    this.setState({})
    console.log('DESELECT CATEGORY')
  }

  render() {
    const {categories, loadingCategories} = this.props

    if (loadingCategories) return <div>Loading...</div>

    console.log('STATE IN CLOSET', this.state)

    return (
      <div id="closet-details">
        <Link to="camera">
          <h1 id="closeth1">BEYONCÉ CLOSET</h1>
        </Link>
        <p id="closetp">Please choose up to one of each</p>

        {this.state.selectedCategoryId ? (
          <ClothingItems
            categoryId={this.state.selectedCategoryId}
            deslectCategory={this.deslectCategory}
          />
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
