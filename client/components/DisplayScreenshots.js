import React, {Component} from 'react'
import { fetchScreenshots} from '../store'
import {connect} from 'react-redux'


class DisplayScreenshots extends Component {

  componentDidMount() {
    this.props.fetchScreenshots()
  }


  render() {
    const {screenshots, loadingScreenshots} = this.props
    if (loadingScreenshots) return <div>Loading...</div>

    return (
      <div>
        {screenshots.map(screenshot => (
          <div  key={screenshot.id} >
              <img/>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loadingScreenshots: state.screenshot.loadingScreenshots,
    screenshots: state.screenshot.screenshots
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchScreenshots: () => dispatch(fetchScreenshots()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayScreenshots)
