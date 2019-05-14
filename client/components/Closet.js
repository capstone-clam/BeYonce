import React, {Component} from 'react'
import {fetchCategories} from '../store/closet'
import {connect} from 'react-redux'
import Songs from './Songs'
import Category from './Category'
import ClothingItems from './ClothingItems'


class Closet extends Component {
  constructor() {
    super()
    this.state = {}
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

  render() {
    const {categories, loadingCategories} = this.props

    if (loadingCategories) return <div>Loading...</div>

    return (
      <div id="closet-details">
        <Songs />

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
