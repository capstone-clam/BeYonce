import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSongs} from '../store'
import Fab from '@material-ui/core/Fab'
import Icon from '@material-ui/core/Icon'

const audio = document.createElement('audio')
audio.src = '/music/Formation.mp3'

class Songs extends Component {
  constructor() {
    super()
    this.state = {
      isPlaying: false
    }
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
  }

  play() {
    audio.play()
    this.setState({isPlaying: true})
  }

  pause() {
    audio.pause()
    this.setState({isPlaying: false})
  }

  // componentDidMount() {
  //   this.props.fetchSongs(3)
  // }

  render() {
    // const {inventories, loadingSongs} = this.props
    // if (loadingSongs) return <div>Loading Songs...</div>
    return (
      <div className="musicButton">
        <Fab
          size="medium"
          color="secondary"
          aria-label="musicNote"
          id="playButton"
          onClick={this.play}
        >
          <Icon>play_arrow</Icon>
        </Fab>
        <Fab
          size="medium"
          color="secondary"
          aria-label="musicNote"
          id="stopButton"
          onClick={this.pause}
        >
          <Icon>pause</Icon>
        </Fab>
      </div>
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
