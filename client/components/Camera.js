import {placeHat} from './hatUtils'
import {placeBodysuit} from './bodysuitUtils'

import React, {Component} from 'react'
import * as posenet from '@tensorflow-models/posenet'
import {Closet} from '../components'
import {connect} from 'react-redux'
import html2canvas from 'html2canvas'
import SimplePopover from './Popup'
import Grid from '@material-ui/core/Grid'

import Fab from '@material-ui/core/Fab'
import CameraIcon from '@material-ui/icons/Camera'
import Modal from '@material-ui/core/Modal'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'
import { AvailablePhoneNumberCountryContext } from 'twilio/lib/rest/api/v2010/account/availablePhoneNumber';

class Camera extends Component {
  static defaultProps = {
    videoWidth: 1280,
    videoHeight: 720,
    flipHorizontal: true,
    algorithm: 'single-pose',
    showVideo: true,
    showSkeleton: false,
    showPoints: true,
    minPoseConfidence: 0.1,
    minPartConfidence: 0.5,
    maxPoseDetections: 2,
    nmsRadius: 20,
    outputStride: 16,
    imageScaleFactor: 0.5,
    skeletonColor: '#ff0000',
    skeletonLineWidth: 6,
    loadingText: 'Loading...please be patient...'
  }

  constructor(props) {
    super(props, Camera.defaultProps)
    this.state = {
      data: null
    }
    this.screenshot = this.screenshot.bind(this)
    this.clearphoto = this.clearphoto.bind(this)
  }

  getCanvas = elem => {
    this.canvas = elem
  }

  getVideo = elem => {
    this.video = elem
  }

  async componentDidMount() {
    try {
      await this.setupCamera()
    } catch (error) {
      throw new Error(
        'This browser does not support video capture, or this device does not have a camera'
      )
    }

    try {
      this.posenet = await posenet.load()
    } catch (error) {
      throw new Error('PoseNet failed to load')
    }

    this.detectPose()
  }

  async setupCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
        'Browser API navigator.mediaDevices.getUserMedia not available'
      )
    }
    const {videoWidth, videoHeight} = this.props
    const video = this.video
    video.width = videoWidth
    video.height = videoHeight

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: 'user',
        width: videoWidth,
        height: videoHeight
      }
    })

    video.srcObject = stream

    return new Promise(resolve => {
      video.onloadedmetadata = () => {
        video.play()
        resolve(video)
      }
    })
  }

  detectPose() {
    const {videoWidth, videoHeight} = this.props
    const canvas = this.canvas
    const canvasContext = canvas.getContext('2d') // Intantiates our canvas as 2D canvas
    // drawImage method happens on canvasContext in utility functions
    canvas.width = videoWidth // canvas and width always same size
    canvas.height = videoHeight // canvas and width always same size
    this.poseDetectionFrame(canvasContext)
  }

  poseDetectionFrame(canvasContext) {
    const {
      algorithm,
      imageScaleFactor,
      flipHorizontal,
      outputStride,
      minPoseConfidence,
      minPartConfidence,
      maxPoseDetections,
      nmsRadius,
      videoWidth,
      videoHeight,
      showVideo,
      showPoints,
      showSkeleton,
      skeletonColor,
      skeletonLineWidth
    } = this.props

    const posenetModel = this.posenet
    const video = this.video

    const findPoseDetectionFrame = async () => {
      let poses = []

      poses = await posenetModel.estimateMultiplePoses(
        video,
        imageScaleFactor,
        flipHorizontal,
        outputStride,
        maxPoseDetections,
        minPartConfidence,
        nmsRadius
      )

      canvasContext.clearRect(0, 0, videoWidth, videoHeight)

      if (showVideo) {
        canvasContext.save()
        canvasContext.scale(-1, 1)
        canvasContext.translate(-videoWidth, 0)
        canvasContext.drawImage(video, 0, 0, videoWidth, videoHeight)
        canvasContext.restore()
      }

      poses.forEach(({score, keypoints}) => {
        if (score >= minPoseConfidence) {
          if (showPoints) {
            placeHat(
              keypoints,
              minPartConfidence,
              canvasContext,
              this.props.selectedHat.item
            )
          }
          if (showPoints) {
            placeBodysuit(
              keypoints,
              minPartConfidence,
              canvasContext,
              this.props.selectedBodysuit.item
            )
          }
        }
      })
      requestAnimationFrame(findPoseDetectionFrame)
    }
    findPoseDetectionFrame()
  }

  //CAMERA  SCREENSHOTS HTML2CANVAS
  clearphoto() {
    console.log('CLEARPHOTO')
    const canvas = this.canvas
    const photo = document.getElementById('photo')
    var canvasContext = canvas.getContext('2d')
    canvasContext.fillStyle = '#FFFFFF'
    canvasContext.fillRect(0, 0, canvas.width, canvas.height)
    const data = canvas.toDataURL('image/jpg', .8)
    photo.setAttribute('src', data)
    // const photo = document.getElementById('photo')
    // document.body.removeChild(photo)
  }

  screenshot() {
    var photo = document.createElement('img')
    var hyper = document.createElement('a')
    // const photo = document.getElementById('photo')
    // const hyper = document.getElementById('hyper')
    html2canvas(document.body).then(function(canvas) {
      // document.body.appendChild(canvas)
      const data = canvas.toDataURL('image/jpeg')
      //make image smaller
      console.log('GOT DATA', data)
      photo.setAttribute('src', data)
      hyper.setAttribute('href', data, + encodeURIComponent('string'))   
      hyper.setAttribute('download', 'beyonce.png')
      console.log("COMPLETED HYPERLINK")
    })
  }

  render() {
    const {selectedBodysuit, selectedHat} = this.props

    return (
      <div>
        <div>
          <video id="videoNoShow" playsInline ref={this.getVideo} />
          <canvas className="webcam" ref={this.getCanvas} />
          <Grid container spacing={24}>
            <Grid item xs={6} lg={6}>
              {selectedBodysuit.item ? (
                <div>
                  <img
                    id="bodysuit"
                    src={selectedBodysuit.filePath}
                    alt={selectedBodysuit.item}
                  />
                </div>
              ) : (
                <img id="bodysuit" src="" alt="" />
              )}
            </Grid>
            <Grid item xs={6} lg={6}>
              {selectedHat.item ? (
                <div>
                  <img
                    id="hat"
                    src={selectedHat.filePath}
                    alt={selectedHat.item}
                  />
                </div>
              ) : (
                <img id="hat" src="" alt="" />
              )}
            </Grid>
          </Grid>
        </div>

        <div data-html2canvas-ignore="true">
          <Closet />
        </div>

        <div />
        {/* <div data-html2canvas-ignore="true" id="camerabutton">
          <Fab size="medium" color="secondary" aria-label="Camera">
            <CameraIcon
              onClick={() => {
                this.screenshot()
              }}
            />
          </Fab>
        </div> */}
        <div data-html2canvas-ignore="true" className="remove-icon">
          <Fab size="medium" color="secondary" onClick={this.clearphoto}>
            <Icon>remove_circle_outline</Icon>
            <Typography variant="srOnly">clear</Typography>
          </Fab>
        </div>
        {/* <img id="photo" /> */}
        {/* <div data-html2canvas-ignore="true" className="download">
          <a id="hyper">
            <i className="material-icons">vertical_align_bottom</i>
          </a>
        </div> */}
        <SimplePopover screenshot={this.screenshot} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedBodysuit: state.selection.selectedBodysuit,
    selectedHat: state.selection.selectedHat
  }
}

export default connect(mapStateToProps)(Camera)
