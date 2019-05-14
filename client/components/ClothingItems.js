import React, {Component} from 'react'
import {fetchCategory, addSelectedItem} from '../store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Buttons from './Buttons'

import Typography from '@material-ui/core/Typography'

class ClothingItems extends Component {
  constructor(props) {
    super(props)
    // this.state = {}
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
    const {loadingCategory, inventories, category} = this.props
    if (loadingCategory) return <div>Loading...</div>

    return (
      <div className="uppercase">
        <Typography component="h6" variant="h6" align="center" gutterBottom>
          BROWSE & CHOOSE ONE {category.name}
        </Typography>
        
        <Buttons />

        {inventories.map(inventory => (
          <div id="singlepic" key={inventory.id} onClick={this.handleClick}>
            <Link to="/camera">
              <div id="closetpics">
                {' '}
                <img
                  className="closetpics"
                  src={inventory.filePath}
                  id={inventory.id}
                  value={inventory.item}
                />
              </div>
            </Link>
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
