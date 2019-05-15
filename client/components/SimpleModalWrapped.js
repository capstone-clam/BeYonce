import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import html2canvas from 'html2canvas'

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
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none'
  }
})

class SimpleModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      newdata: ''
    }
    this.screenshot = this.screenshot.bind(this)
  }

  handleOpen = () => {
    this.screenshot()
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  screenshot(){
    // const photo = document.createElement('img')
    // const hyper = document.createElement('a')
    //console.log("PHOTO TOP", photo)
    // const photo = document.getElementById('photo')
    // const hyper = document.getElementById('hyper')
    html2canvas(document.body).then(function(canvas) {
      document.body.appendChild(canvas)
      const data = canvas.toDataURL('image/jpeg')
      console.log('GOT DATA', data)

      //make image smaller

      // photo.setAttribute('src', data)
      // hyper.setAttribute('href', data, +encodeURIComponent('string'))
      // hyper.setAttribute('download', 'beyonce.png')
      // console.log('COMPLETED HYPERLINK')
      // console.log('PHOTO BOTTOM', photo)
    })
    this.setState({
      newdata: data
    })
  }

  render() {
    const {classes} = this.props

    return (
      <div>
        <Typography gutterBottom>
          Click to get the full Modal experience!
        </Typography>
        <Button onClick={this.handleOpen}>Open Modal</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Text in a modal
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            <img id="photo" />
            <div data-html2canvas-ignore="true" className="download">
              <a id="hyper">
                <i className="material-icons">vertical_align_bottom</i>
              </a>
            </div>

            {/* <SimpleModalWrapped /> */}
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
