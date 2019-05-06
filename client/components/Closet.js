import React, {Component} from 'react'
import {fetchCategories} from '../store/closet'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export class Closet extends Component {
  constructor() {
    super()
    this.state = {
      showClothingItem: false
    }
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.fetchCategories()
  }
  handleClick() {
    return this.setState({
      showClothingItem: !this.state.showClothingItem
    })
  }

  render() {
    const {loading, categories} = this.props

    if (loading) return <div>Loading...</div>

    return (
      <div id="closet-details">
        <h1 id="closeth1">BEYONCÉ CLOSET</h1>
        <p id="closeth1">Please choose up to one of each</p>
        {categories.map(category => (
          <div id="closetpics" key={category.id}>
            <div id="singlepic">
              <Link to={`/closet/${category.id}`}>
                <div>
                  <img
                    id="closetpics"
                    src={category.image}
                    onClick={this.handleClick}
                  />
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.closet.loading,
    categories: state.closet.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Closet)
