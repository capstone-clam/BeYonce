import React, {Component} from 'react'
import {addBodysuitThunk, addHatThunk, reset} from '../store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'

import Typography from '@material-ui/core/Typography'

class ClothingItems extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.backClosetClick = this.backClosetClick.bind(this)
  }

  backClosetClick(ev) {
    ev.preventDefault()
    this.props.reset()
  }

  // eslint-disable-next-line complexity
  handleClick(ev) {
    ev.preventDefault()
    let mySelection = ev.target.alt
    if (
      mySelection === 'flowerHat' ||
      mySelection === 'finalcrown' ||
      mySelection === 'beadedCrown' ||
      mySelection === 'orangeHat'
    ) {
      let hatID = ev.target.id
      this.props.addHatThunk(hatID)
    } else if (
      mySelection === 'barbieBodysuit' ||
      mySelection === 'redBodysuit' ||
      mySelection === 'goldBodysuit' ||
      mySelection === 'pearlBodysuit'
    ) {
      let bodysuitID = ev.target.id
      this.props.addBodysuitThunk(bodysuitID)
    }
  }

  clearButton() {}

  render() {
    const {inventories, name} = this.props.selectedCategory
    // if (loadingCategory) return <div>Loading...</div>

    return (
      <div className="uppercase">
        <Typography component="h6" variant="h6" align="center" gutterBottom>
          BROWSE & CHOOSE ONE {name}
        </Typography>

        <div>
          <Grid container spacing={16}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                onClick={this.backClosetClick}
              >
                Closet
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button variant="contained" size="small" color="secondary">
                Clear
              </Button>
            </Grid>
          </Grid>
        </div>
        {inventories.map(inventory => (
          <div id="singlepic" key={inventory.id} onClick={this.handleClick}>
            <Link to="/camera">
              <div id="closetpics">
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
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loadingCategory: state.closet.loadingCategory,
    selectedCategory: state.selection.selectedCategory
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addBodysuitThunk: bodysuitID => dispatch(addBodysuitThunk(bodysuitID)),
    addHatThunk: hatID => dispatch(addHatThunk(hatID)),
    reset: () => dispatch(reset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClothingItems)
