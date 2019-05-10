import {drawKeyPoints, drawSkeleton, placeHat, placeGrammy} from './cameraUtils'
import React, {Component} from 'react'
import * as posenet from '@tensorflow-models/posenet'
import {Closet} from '../components'
import {connect} from 'react-redux'
import Fab from '@material-ui/core/Fab'
import CameraIcon from '@material-ui/icons/Camera'
import store from '../store'


import {assertNonNull} from '@tensorflow/tfjs-core/dist/util'
let initialState = store.getState()

class Camera extends Component {
  static defaultProps = {
    videoWidth: 900,
    videoHeight: 700,
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
    this.state = {
      showCanvas: false,
      checkedButton: false
    }
    this.takepicture = this.takepicture.bind(this)
    this.clearphoto = this.clearphoto.bind(this)
    this.openLightbox = this.openLightbox.bind(this)
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

  componentDidUpdate(prevProps) {
    return prevProps.showLightbox !== this.props.showLightbox
  }

  openLightbox(str) {
    store.dispatch(takeSnapshot(str))
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
      imageScaleFactor,
      flipHorizontal,
      outputStride,
      minPoseConfidence,
      minPartConfidence,
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
      const pose = await posenetModel.estimateSinglePose(
        video,
        imageScaleFactor,
        flipHorizontal,
        outputStride
      )
      poses.push(pose)

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
            placeHat(keypoints, minPartConfidence, skeletonColor, canvasContext)
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

  // takepicture(){
  //   const {videoWidth, videoHeight} = this.props
  //   const canvas = this.canvas
  //   console.log("CANVAS", canvas)
  //   const video = this.video
  //   const tempCanvas = this.canvas.getContext('2d')
  //   const photo = document.getElementById('photo')
    
  //     var canvasContext = this.canvas.getContext('2d');
      
  //     if(videoWidth && videoHeight){
  //         canvas.width = videoWidth;
  //         canvas.height = videoHeight;
  //         canvasContext.drawImage(video, 0, 0, videoWidth, videoHeight);
  //         console.log("ANYTHING")
  //         var data = canvas.toDataURL('image/png');
  //         console.log("GOT DATA")
  //         photo.setAttribute('src', data);
  //         console.log("GOT PHOTO SET ATTRIBUTE")
  //     }else{
  //       console.log("CLEAR PHOTO")
  //     }
  // }
  
  // clearphoto(){
  //   console.log("CLEARPHOTO")
  //   const canvas = this.canvas
  //   const photo = document.getElementById('photo')
  //   var canvasContext = canvas.getContext('2d');
  //   canvasContext.fillStyle = "#FFFFFF"
  //   canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  //   var data= canvas.toDataURL('image/png');
  //   photo.setAttribute('src', data);
  // }

  //
  let fullImageStr;

export function saveCanvas() {
  const backgroundCanvas = document.getElementById('background')
  const bgCtx = backgroundCanvas.getContext('2d')
  const canvas = document.getElementById('output')

  bgCtx.drawImage(canvas, 0, 0)
  fullImageStr = bgCtx.canvas.toDataURL('image/png')

  return fullImageStr
}

//create a DOM element to hold download ref
export function download() {
  let element = document.createElement('a')
  const file = fullImageStr.replace('image/png', 'image/octet-stream')
  element.href = file
  element.download = 'airbrush.png'
  element.click()
}
  //
  const clearCanvasZone = document
  .getElementById('clear-button')
  .getBoundingClientRect()

const snapshotZone = document
  .getElementById('take-snapshot')
  .getBoundingClientRect()
  //

import store, {
  takeSnapshot
} from '../store'

  import {saveCanvas} from './snapshot'
  snapshot(){
    const imgStr = saveCanvas()
    store.dispatch(takeSnapshot(imgStr))
  }

  render() {
    const {selection} = this.props.selection

    return (
      <div>
          <video id="videoNoShow" playsInline ref={this.getVideo} />
          <canvas className="webcam" ref={this.getCanvas} />
          <button type="button" onClick={this.clearphoto}>CLEAR PHOTO</button>
           <Fab size="large" color="secondary" aria-label="Camera">
            <CameraIcon
              
              onClick={this.takepicture}
            />
          </Fab>
          {/* <button type="button" onClick={this.takepicture}>SCREENSHOT</button> */}

          {selection.item ? (
            <img id={selection.item} src={selection.filePath} />
          ) : (
            <img id="flowerHat" src="/FlowerhatBrightened75.png" />
          )}
        
          <img id='photo'/>
          <Closet />
         
          {/* <Fab size="large" color="secondary" aria-label="Camera">
            <CameraIcon
              onClick={()=>this.takepicture}
            />
          </Fab> */}

          {/* <img id="grammy" src="/Grammycropped.png" /> */}
          {/* <img id="bodySuit" src="/BeyBarbieBodysuit.png" /> */}
        
      </div>
    )
  }
}

// export default Camera

const mapStateToProps = state => {
  return {
    selection: state.selection
  }
}

export default connect(mapStateToProps)(Camera)
