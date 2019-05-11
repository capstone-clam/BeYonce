import React, {Component} from 'react'
import Songs from './Songs'
import Camera from './Camera'
import Camera2 from './Camera2'

class Main extends Component {
//   constructor() {
//     super()
//   }
  componentDidMount() {
  }

  render() {
    // const {} = this.props
    // if (loadingCategories) return <div>Loading...</div>

    return (
      <div id="mainclass">
        <Songs/>
        <Camera2/>
      </div>
    )
  }
}

export default Main