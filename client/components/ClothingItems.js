import React, {Component} from 'react'
import {fetchCategory} from '../store'
import {connect} from 'react-redux'

export class ClothingItems extends Component {
  constructor(props) {
    super(props)
    this.findItems = this.findItems.bind(this)
  }

  componentDidMount() {
    const categoryId = Number(this.props.match.params.categoryId)
    this.props.fetchCategory(categoryId)
  }

  findItems(category) {
    if (category[0].inventories !== undefined) {
      const inventories = category[0].inventories
      return inventories
    }
  }

  render() {
    const {loading, inventories} = this.props

    if (loading) return <div>Loading...</div>

    return (
      <div id="closet-details">
        <h1 id="closeth1">BEYONCÉ CLOSET</h1>
        <p id="closetp">Please choose up to one of each</p>

        {inventories.map(inventory => (
          <div id="singlepic" key={inventory.id}>
            <img id="closetpics" src={inventory.filePath} />
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.closet.loading,
    inventories: state.closet.inventories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategory: categoryId => dispatch(fetchCategory(categoryId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClothingItems)
