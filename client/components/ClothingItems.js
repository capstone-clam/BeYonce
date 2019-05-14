import React, {Component} from 'react'
import {fetchCategory, addSelectedItem} from '../store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Buttons from './Buttons'
import Grid from '@material-ui/core/Grid'

import Typography from '@material-ui/core/Typography'

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
    console.log('alt::::')
    console.log(ev.target.alt)
  }

  render() {
    const {loadingCategory, inventories, category} = this.props
    if (loadingCategory) return <div>Loading...</div>

    return (
      <div className="uppercase">
        <Typography component="h6" variant="h6" align="center" gutterBottom>
          BROWSE & CHOOSE ONE {category.name}
        </Typography>

        <div>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Buttons />
            </Grid>
          </Grid>
        </div>
        {inventories.map(inventory => (
          <div id="singlepic" key={inventory.id} onClick={this.handleClick}>
            <div id="closetpics">
              {' '}
              <img
                className="closetpics"
                src={inventory.filePath}
                id={inventory.id}
                value={inventory.item}
                alt={inventory.categoryId}
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
