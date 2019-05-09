import React, {Component} from 'react'
import {fetchCategory, addSelectedItem} from '../store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class ClothingItems extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    const selectedId = Number(this.props.categoryId)
    this.props.fetchCategory(selectedId)
  }

  handleClick(ev) {
    ev.preventDefault()
    let mySelection = Number(ev.target.id)
    this.props.addSelectedItem(mySelection)
  }

  render() {
    const {loadingCategory, inventories} = this.props
    if (loadingCategory) return <div>Loading...</div>

    return (
      <div>
        {inventories.map(inventory => (
          <div id="singlepic" key={inventory.id} onClick={this.handleClick}>
            {/* <Link to="/camera"> */}
            <div id="closetpics">
              {' '}
              <img
                className="closetpics"
                src={inventory.filePath}
                id={inventory.id}
                value={inventory.item}
                onClick={() => this.props.deslectCategory()}
              />
            </div>
            {/* </Link> */}
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
