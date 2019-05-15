import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 40
  }
})

class SimplePopover extends React.Component {
  state = {
    anchorEl: null
  }

  handleClick = event => {
    this.props.screenshot()
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  handleClose = () => {
    this.setState({
      anchorEl: null
    })
  }

  render() {
    const {classes} = this.props
    const {anchorEl} = this.state
    const open = Boolean(anchorEl)

    return (
      <div id="popup">
        <Button
          aria-owns={open ? 'simple-popper' : undefined}
          aria-haspopup="true"
          variant="contained"
          onClick={this.handleClick}
        >
          CAPTURE IAMGE
        </Button>
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <a id="hyper">
            <i className="material-icons">vertical_align_bottom</i>
          </a>
          <img id="photo" />
          <Typography className={classes.typography}>
            The content of the Popover.
            <img id="photo" />
          </Typography>
        </Popover>
      </div>
    )
  }
}

SimplePopover.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimplePopover)
