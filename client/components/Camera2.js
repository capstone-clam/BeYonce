import {drawSkeleton, placeHat, placeGrammy} from './cameraUtils'
import React, {Component} from 'react'
import * as posenet from '@tensorflow-models/posenet'
import {Closet, Songs} from '../components'
import {connect} from 'react-redux'
import Hidden from '@material-ui/core/Hidden'

import {withStyles} from '@material-ui/core/styles'
import {Container} from '@tensorflow/tfjs-layers/dist/engine/container'

class Camera2 extends Component {
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
    super(props, Camera2.defaultProps)
    this.takepicture =this.takepicture.bind(this)
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

//   capture(){
//       // Find the canvas element to capture
// const canvasElt = document.getElementById('webcam');

// // Get the stream
// const stream = canvasElt.captureStream(25); // 25 FPS

// // Do things to the stream
// // E.g. Send it to another computer using an RTCPeerConnection
// //      pc is an RTCPeerConnection created elsewhere
// // pc.addStream(stream);
// console.log("STREAM", stream)

//   }

  takepicture(){
    const {videoWidth, videoHeight} = this.props
    const canvas = document.getElementById('webcam');

// Get the stream
const stream = canvas.captureStream(25);
    // const canvas = this.canvas
    const video = this.video
    const photo = document.getElementById('photo')
    // const stream = this.canvas.getContext('2d');
    console.log("STREAM", stream)
      
      if(videoWidth && videoHeight){
          canvas.width = videoWidth;
          canvas.height = videoHeight;
          stream.drawImage(video, 0, 0, videoWidth, videoHeight);
          const data = video.toDataURL('image/png');
          console.log("DATAPIC", data)
          photo.setAttribute('src', data);
      
      }else{
        console.log("CLEAR PHOTO")
      }
  }
  


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

          {/* <img id="grammy" src="/Grammycropped.png" /> */}
          {/* <img id="bodySuit" src="/BeyBarbieBodysuit.png" /> */}
        </div>
        <button id="camerabutton"type="button" onClick={()=>this.takepicture()}>CAPTURE</button>
        <Closet />
        <img id="photo"/>
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

export default connect(mapStateToProps)(Camera2)
