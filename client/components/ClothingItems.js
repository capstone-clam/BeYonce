import React, {Component} from 'react'
import {
  fetchCategory,
  addSelectedItem,
  addBodysuitThunk,
  addHatThunk
} from '../store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import RefreshIcon from '@material-ui/icons/Refresh'
import Icon from '@material-ui/core/Icon'

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

  // eslint-disable-next-line complexity
  handleClick(ev) {
    ev.preventDefault()
    console.log('ev.target:', ev.target)
    let mySelection = ev.target.alt
    console.log('mySelection:', mySelection)
    if (
      mySelection === 'flowerHat' ||
      mySelection === 'finalcrown' ||
      mySelection === 'beadedCrown' ||
      mySelection === 'orangeHat'
    ) {
      let hatID = ev.target.id
      console.log('hatID:', hatID)
      this.props.addHatThunk(hatID)
    } else if (
      mySelection === 'barbieBodysuit' ||
      mySelection === 'redBodysuit' ||
      mySelection === 'goldBodysuit' ||
      mySelection === 'pearlBodysuit'
    ) {
      let bodysuitID = ev.target.id
      console.log('bodysuitID:', bodysuitID)
      this.props.addBodysuitThunk(bodysuitID)
    }
  }

  render() {
    const {loadingCategory, inventories, classes} = this.props
    if (loadingCategory) return <div>Loading...</div>

    return (
      <div>
        {inventories.map(inventory => (
          <div id="singlepic" key={inventory.id} onClick={this.handleClick}>
            <Link to="/camera">
              <div id="closetpics">
                {' '}
                <img
                  className="closetpics"
                  src={inventory.filePath}
                  id={inventory.id}
                  alt={inventory.item}
                />
              </div>
            </Link>
          </div>
        ))}
        <div>
          <Fab size="medium" color="secondary" aria-label="Refresh">
            <RefreshIcon
              onClick={() => {
                this.props.deslectCategory()
              }}
            />
          </Fab>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loadingCategory: state.closet.loadingCategory,
    category: state.closet.category, // hat, bodysuit, song
    inventories: state.closet.inventories // hat1, hat2, hat3..
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addBodysuitThunk: bodysuitID => dispatch(addBodysuitThunk(bodysuitID)),
    addHatThunk: hatID => dispatch(addHatThunk(hatID)),
    fetchCategory: categoryId => dispatch(fetchCategory(categoryId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClothingItems)
