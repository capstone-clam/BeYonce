import React, {Component} from 'react'
import Songs from './Songs'
import Camera from './Camera'

class Main extends Component {
  render() {
    return (
      <div id="mainclass">
        <Songs />
        <Camera />
      </div>
    )
  }
}

export default Main
