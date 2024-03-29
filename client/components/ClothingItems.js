import React, {Component} from 'react'
import {
  addBodysuitThunk,
  addHatThunk,
  addSongThunk,
  reset,
  removeAll
} from '../store'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import {CleanButton} from '../components'

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

  handleClick(ev) {
    ev.preventDefault()

    let mySelection = this.props.selectedCategory.name

    if (mySelection === 'Hat') {
      let hatID = ev.target.id
      this.props.addHatThunk(hatID)
    } else if (mySelection === 'BodySuit') {
      let bodysuitID = ev.target.id
      this.props.addBodysuitThunk(bodysuitID)
    } else if (mySelection === 'Song') {
      let songID = ev.target.id
      this.props.addSongThunk(songID)
    }
  }

  render() {
    const {inventories, name} = this.props.selectedCategory
    console.log('inventories:', inventories)

    return (
      <div className="uppercase">
        <Typography component="h6" variant="h6" align="center" gutterBottom>
          BROWSE & CHOOSE A {name}
        </Typography>
        {name === 'Song' ? (
          <p className="songInstructions">
            (& then Press play in the bottom left corner)
          </p>
        ) : (
          <div />
        )}

        <div className="clearAndHomeButtons">
          <Grid container spacing={16} align="center">
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
              <CleanButton />
            </Grid>
          </Grid>
        </div>
        {inventories.map(
          inventory =>
            inventory.categoryId === 3 ? (
              <div id="singlepic" key={inventory.id} onClick={this.handleClick}>
                <div id="closetpics">
                  <img
                    className="songPics"
                    src={inventory.imageFilePath}
                    id={inventory.id}
                    alt={inventory.item}
                  />
                </div>
              </div>
            ) : (
              <div id="singlepic" key={inventory.id} onClick={this.handleClick}>
                <div id="closetpics">
                  <img
                    className="closetpics"
                    src={inventory.filePath}
                    id={inventory.id}
                    alt={inventory.item}
                  />
                </div>
              </div>
            )
        )}
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
    addSongThunk: songID => dispatch(addSongThunk(songID)),
    reset: () => dispatch(reset()),
    removeAll: () => dispatch(removeAll())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClothingItems)
