import {drawSkeleton, placeHat} from './hatUtils'
import {placeBodysuit} from './bodysuitUtils'

import React, {Component} from 'react'
import * as posenet from '@tensorflow-models/posenet'
import {Closet} from '../components'
import {connect} from 'react-redux'
import html2canvas from 'html2canvas'
import SimpleModalWrapped from './Popup'

import Fab from '@material-ui/core/Fab'
import CameraIcon from '@material-ui/icons/Camera'
import Modal from '@material-ui/core/Modal';

class Camera extends Component {
  static defaultProps = {
    videoWidth: 1280,
    videoHeight: 720,
    flipHorizontal: true,
    algorithm: 'single-pose',
    showVideo: true,
    showSkeleton: true,
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
    this.state= {
      data : null
    }
    this.screenShoot = this.screenShoot.bind(this)
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
          if (showSkeleton) {
            drawSkeleton(
              keypoints,
              minPartConfidence,
              skeletonColor,
              skeletonLineWidth,
              canvasContext
            )
          }
        }
      })
      requestAnimationFrame(findPoseDetectionFrame)
    }
    findPoseDetectionFrame()
  }

  //CAMERA  SCREENSHOTS HTML2CANVAS
  clearphoto(){
    console.log("CLEARPHOTO")
    const canvas = this.canvas
    const photo = document.getElementById('photo')
    var canvasContext = canvas.getContext('2d');
    canvasContext.fillStyle = "#FFFFFF"
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    var data= canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

  screenShoot() {
    const photo = document.getElementById('photo')
    html2canvas(document.body).then(function(canvas) {
      document.body.appendChild(canvas)
      // const data = canvas.toDataURL('image/png')
      const data = canvas.toDataURL('image/png');
      // this.setState({
      //   data
      // })
      //specify resolution 
      console.log('GOT PNG DATA', data)
      // console.log('TYPEOF', typeof data)
      photo.setAttribute('src', data)
    })
  }
  //message pic to text

  screenShoot() {
    const photo = document.getElementById('photo')
    html2canvas(document.body).then(function(canvas) {
      // document.body.appendChild(canvas)
      const data = canvas.toDataURL('image/png')
      console.log('GOT DATA')
      photo.setAttribute('src', data)
    })
  }
  //message pic to text

  render() {
    const {selectedBodysuit, selectedHat} = this.props
    console.log('camera props:', this.props)
    console.log('selectedBodysuit:', selectedBodysuit)
    return (
      <div>
        <div>
          <video id="videoNoShow" playsInline ref={this.getVideo} />
          <canvas className="webcam" ref={this.getCanvas} />

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

          {selectedHat.item ? (
            <div>
              <img id="hat" src={selectedHat.filePath} alt={selectedHat.item} />
            </div>
          ) : (
            <img id="hat" src="" alt="" />
          )}
        </div>
        <div data-html2canvas-ignore="true">
          <Closet />
        </div>

        <img id="photo" />

        <div />
        <div data-html2canvas-ignore="true" id="camerabutton">
          <Fab size="medium" color="secondary" aria-label="Camera">
            <CameraIcon
              onClick={() => {
                this.screenShoot()
              }}
            />
          </Fab>
        </div>
        <button id="download-icon" type="button" onClick={this.clearphoto}><i className="material-icons">vertical_align_bottom</i></button>
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
