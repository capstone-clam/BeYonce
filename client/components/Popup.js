import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import CameraIcon from '@material-ui/icons/Camera'

function rand() {
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
  const top = 50 + rand()
  const left = 50 + rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    // backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none'
  }
})

class SimpleModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            open: false
          }
    }
  

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  render() {
    const {classes} = this.props

    return (
      <div>
        {/* <Typography gutterBottom>
          <Button onClick={this.screenShoot}>Capture</Button>
        </Typography> */}
        <Button onClick={this.handleOpen}><Fab size="medium" color="secondary" aria-label="Camera">
        <CameraIcon onClick={this.screenShoot} />
            {/* <Button onClick={this.screenShoot}>Capture</Button> */}
          </Fab></Button>
        {/* <div />
        <div data-html2canvas-ignore="true" id="camerabutton">
          <Fab size="medium" color="secondary" aria-label="Camera">
            <CameraIcon onClick={this.handleOpen} />
          </Fab>
        </div> */}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Take a screenshot
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              Click the capture button to take a screenshot
            </Typography>
            <SimpleModalWrapped />
          </div>
        </Modal>
      </div>
    )
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired
}

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal)

export default SimpleModalWrapped
