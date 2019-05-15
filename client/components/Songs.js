import React, {Component} from 'react'
import {connect} from 'react-redux'
import Fab from '@material-ui/core/Fab'
import Icon from '@material-ui/core/Icon'

const audio = document.createElement('audio')

class Songs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlaying: false
    }
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
  }

  play() {
    audio.src = this.props.selectedSong.filePath
    audio.play()
    this.setState({isPlaying: true})
  }

  pause() {
    audio.src = this.props.selectedSong.filePath
    audio.pause()
    this.setState({isPlaying: false})
  }

  render() {
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
    selectedSong: state.selection.selectedSong
  }
}

export default connect(mapStateToProps, null)(Songs)
