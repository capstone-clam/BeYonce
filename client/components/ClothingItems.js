import React, {Component} from 'react'
import {fetchCategory, addSelectedItem} from '../store'
import {connect} from 'react-redux'

class ClothingItems extends Component {
  componentDidMount() {
    const selectedId = Number(this.props.categoryId)
    this.props.fetchCategory(selectedId)
  }

  render() {
    const {loadingCategory, inventories} = this.props
    if (loadingCategory) return <div>Loading...</div>

    return (
      <div>
        {inventories.map(inventory => (
          <div id="closetpics" key={inventory.id}>
            <div id="singlepic">
              <img
                className="closetpics"
                src={inventory.filePath}
                id={inventory.id}
                value={inventory.item}
              />
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loadingCategory: state.closet.loadingCategory,
    category: state.closet.category,
    inventories: state.closet.inventories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addSelectedItem: inventoryId => dispatch(addSelectedItem(inventoryId)),
    fetchCategory: categoryId => dispatch(fetchCategory(categoryId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClothingItems)
