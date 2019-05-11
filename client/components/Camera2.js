import {drawSkeleton, placeHat, placeGrammy} from './cameraUtils'
// import React, {Component} from 'react'
import * as posenet from '@tensorflow-models/posenet'
import {Closet} from '../components'
import {connect} from 'react-redux'

import React from 'react'
import Webcam from 'react-webcam'

class Camera2 extends React.Component {
  setRef = webcam => {
    this.webcam = webcam
  }

  capture = () => {
    const photo = document.getElementById('photo')
    const imageSrc = this.webcam.getScreenshot()
    photo.setAttribute('src', imageSrc)
  }

  render() {
    const {selection} = this.props.selection
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user'
    }

    return (
      <div>
        <Webcam
        id="webcam"
          audio={false}
          height={1300}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={1300}
          videoConstraints={videoConstraints}
        />
        <button type="button" onClick={this.capture}>
          Capture photo
        </button>
        <Closet />
        <img id="photo" />
        {selection.item ? (
          <img id="hat" src={selection.filePath} alt={selection.item} />
        ) : (
          <img id="hat" src="" alt="" />
        )}
        {/* <img id="grammy" src="/Grammycropped.png" /> */}
        {/* <img id="bodySuit" src="/BeyBarbieBodysuit.png" /> */}
      </div>
    )
  }
}
// class Camera2 extends React.Component {
//     // static defaultProps= {
//     //     className: '',
//     //     audio:true,
//     //     height: 480, //	height of video element
//     //     width:	640,	// width of video element
//     //     screenshotWidth: 640, // width of screenshot
//     //     style: {},	//style prop passed to video element
//     //     screenshotFormat: '', //'image/webp'	format of screenshot
//     //     onUserMedia, //	function callback for when component receives a media stream
//     //     onUserMediaError, //function callback for when component can't receive a media stream with MediaStreamError param
//     //     screenshotQuality: 0.92,	//quality of screenshot(0 to 1)
//     //     audioConstraints,	//object, MediaStreamConstraint(s) for the audio
//     //     videoConstraints //	object, MediaStreamConstraints(s) for the video
//     // }

//   render() {
//     const {selection} = this.props.selection
//     return(
//       <div>
//         <div>
//           <Webcam className="webcam"/>;
//           {selection.item ? (
//             <img id="hat" src={selection.filePath} alt={selection.item} />
//           ) : (
//             <img id="hat" src="" alt="" />
//           )}

//           {/* <img id="grammy" src="/Grammycropped.png" /> */}
//           {/* <img id="bodySuit" src="/BeyBarbieBodysuit.png" /> */}
//         </div>
//         <Closet />
//       </div>
//     )
//   }
// }

const mapStateToProps = state => {
  return {
    selection: state.selection
  }
}

export default connect(mapStateToProps)(Camera2)
// const mapStateToProps = state => {
//     return {
//       selection: state.selection
//     }
//   }

//   export default connect(mapStateToProps)(Camera2)
