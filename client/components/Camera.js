import {drawSkeleton, placeHat} from './cameraUtils'
import React, {Component} from 'react'
import * as posenet from '@tensorflow-models/posenet'
import {Closet} from '../components'
import {connect} from 'react-redux'
import html2canvas from 'html2canvas'
import SimpleModalWrapped from './Popup'

import Fab from '@material-ui/core/Fab'
import CameraIcon from '@material-ui/icons/Camera'
import DownloadIcon from '@material-ui/icons/Download'
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
              this.props.selection.item
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


  screenShoot() {
    const photo = document.getElementById('photo')
    html2canvas(document.body).then(function(canvas) {
      document.body.appendChild(canvas)
      // const data = canvas.toDataURL('image/png')
      const data = canvas.toDataURL('image/jpeg', .01);
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

  render() {
    const {selection} = this.props.selection
    return (
      <div>
        <div>

          <video id="videoNoShow" playsInline ref={this.getVideo} />
          <canvas className="webcam" ref={this.getCanvas} />

          {selection.item ? (
            <img id="hat" src={selection.filePath} alt={selection.item} />
          ) : (
            <img id="hat" src="" alt="" />
          )}
        </div>
        <div data-html2canvas-ignore="true">
          <Closet />
        </div>
        {/* <SimpleModalWrapped screenShoot={this.screenShoot} data={this.state.data}/> */}

        <img id="photo" src=''/>

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
        <div data-html2canvas-ignore="true" id="downloadbutton">
          <Fab size="medium" color="secondary" aria-label="Download">
            <DownloadIcon
            />
          </Fab>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selection: state.selection
  }
}

export default connect(mapStateToProps)(Camera)
