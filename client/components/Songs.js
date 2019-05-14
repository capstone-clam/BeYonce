import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSongs} from '../store'
import Fab from '@material-ui/core/Fab'
// import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'

class Songs extends Component {
  componentDidMount() {
    this.props.fetchSongs(3)
  }

  render() {
    const {inventories, loadingSongs} = this.props
    if (loadingSongs) return <div>Loading Songs...</div>
    return (
      <div className="musicButton">
        <Fab size="medium" color="secondary" aria-label="Camera">
          <Icon>music_note</Icon>
          <audio src="/music/Formation.mp3" id="songinmain" />
        </Fab>
      </div>

      // <Button variant="contained" size="small" color="secondary">
      // {/* <Icon>music_note</Icon> */}
      // <audio src="/music/Formation.mp3" id="songinmain" />
      // {/* </Button> */}
    )
  }
}

const mapStateToProps = state => {
  return {
    songs: state.songs.songs,
    inventories: state.songs.inventories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSongs: categoryId => dispatch(fetchSongs(categoryId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Songs)
