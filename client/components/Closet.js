import React, {Component} from 'react'
import {fetchCategories} from '../store/closet'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Songs from './Songs'

import Category from './Category'
import ClothingItems from './ClothingItems'

import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'

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
    window.location.reload()
  }

  render() {
    const {categories, loadingCategories} = this.props

    if (loadingCategories) return <div>Loading...</div>

    return (
      <div id="closet-details">
        <div>
          <Typography component="h6" variant="h6" align="center" gutterBottom>
            BROWSE & CHOOSE ONE ITEM
          </Typography>
        </div>

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
