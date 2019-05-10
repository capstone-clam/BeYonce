import React, {Component} from 'react'
import Songs from './Songs'
import Camera from './Camera'

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
          <div id= 'songinmain'>
        <Songs/>
        </div>
        <Camera/>
      </div>
    )
  }
}

export default Main