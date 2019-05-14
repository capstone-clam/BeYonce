import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSongs} from '../store'

class Songs extends Component {
  componentDidMount() {
    this.props.fetchSongs(3)
  }

  render() {
    const {inventories, loadingSongs} = this.props
    if (loadingSongs) return <div>Loading Songs...</div>
    return (
      <button>
        <audio src="/music/Formation.mp3" id="songinmain" />
      </button>
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
