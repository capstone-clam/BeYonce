import React, {Component} from 'react'
import {removeAll} from '../store'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'

class CleanButton extends Component {
  constructor(props) {
    super(props)

    this.resetClick = this.resetClick.bind(this)
  }

  resetClick(ev) {
    ev.preventDefault()
    this.props.removeAll()
  }

  render() {
    return (
      <div>
        <Button
          variant="contained"
          size="small"
          color="secondary"
          onClick={this.resetClick}
        >
          Clear
        </Button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeAll: () => dispatch(removeAll())
  }
}

export default connect(null, mapDispatchToProps)(CleanButton)
