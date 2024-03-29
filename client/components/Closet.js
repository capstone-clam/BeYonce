import React, {Component} from 'react'
import {fetchCategories} from '../store/closet'
import {connect} from 'react-redux'
import Songs from './Songs'
import Category from './Category'
import ClothingItems from './ClothingItems'

class Closet extends Component {
  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    return (
      <div id="closet-details">
        <Songs />
        {this.props.selection.id ? (
          <ClothingItems category={this.props.selection} />
        ) : (
          <Category />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.closet.categories,
    selection: state.selection.selectedCategory
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Closet)
