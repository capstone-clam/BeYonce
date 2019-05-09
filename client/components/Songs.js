import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCategory} from '../store'

class Songs extends Component {
  constructor(props) {
    super(props)
    this.randomSong = this.randomSong.bind(this)
  }

  componentDidMount() {
    console.log('this.props in componentDidMount', this.props)
    this.props.fetchCategory(4)
  }

  randomSong(inventory) {
    const songSelection =
      inventory[Math.floor(Math.random() * inventory.length)]
    console.log(songSelection)
    return songSelection.filePath
  }

  render() {
    const {inventories} = this.props
    console.log('inventories', inventories)
    return <audio controls src="/SingleLadies.mp3" />
    // return <audio controls src={this.randomSong(inventories)} />
  }
}

const mapStateToProps = state => {
  return {
    category: state.closet.category,
    inventories: state.closet.inventories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategory: categoryId => dispatch(fetchCategory(categoryId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Songs)
