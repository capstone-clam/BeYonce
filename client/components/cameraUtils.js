import * as posenet from '@tensorflow-models/posenet'

const pointRadius = 3

export const config = {
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

export function takepicture(){
  console.log
  // const {videoWidth, videoHeight} = this.props
  // const canvas = this.canvas
  // const video = this.video
  // const photo = this.photo
  //   var canvasContext = canvas.getContext('2d');
  //   if(videoWidth && videoHeight){
  //       canvas.width = videoWidth;
  //       canvas.height = videoHeight;
  //       canvasContext.drawImage(video, 0, 0, videoWidth, videoHeight);
  //       console.log("ANYTHING")

  //       var data = canvas.toDataUrl('image/png');
  //       photo.setAttribute('src', data);
  //   }else{
  //       console.log('CLEARPHOTO')
  //   }
}

function toTuple({x, y}) {
  return [x, y]
}

export function drawKeyPoints(
  keypoints,
  minConfidence,
  skeletonColor,
  canvasContext,
  scale = 1
) {
  keypoints.forEach(keypoint => {
    if (keypoint.score >= minConfidence) {
      const {x, y} = keypoint.position
      canvasContext.beginPath()
      canvasContext.arc(x * scale, y * scale, pointRadius, 0, 2 * Math.PI)
      canvasContext.fillStyle = skeletonColor
      canvasContext.fill()
    }
  })
}

function drawSegment(
  [firstX, firstY],
  [nextX, nextY],
  color,
  lineWidth,
  scale,
  canvasContext
) {
  canvasContext.beginPath()
  canvasContext.moveTo(firstX * scale, firstY * scale)
  canvasContext.lineTo(nextX * scale, nextY * scale)
  canvasContext.lineWidth = lineWidth
  canvasContext.strokeStyle = color
  canvasContext.stroke()
}

export function drawSkeleton(
  keypoints,
  minConfidence,
  color,
  lineWidth,
  canvasContext,
  scale = 1
) {
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
    keypoints,
    minConfidence
  )

  adjacentKeyPoints.forEach(keypoints => {
    drawSegment(
      toTuple(keypoints[0].position),
      toTuple(keypoints[1].position),
      color,
      lineWidth,
      scale,
      canvasContext
    )
  })
}


// The following utility functions are called in Camera.js on line 142 :

//https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage

// Flower hat function:
export function placeHat(
  keypoints,
  minConfidence,
  skeletonColor,
  canvasContext,
  scale = 1
) {
  const rightEarX = keypoints[4].position.x
  const leftEarX = keypoints[3].position.x
  const leftEyeX = keypoints[1].position.x
  // const rightEarX = keypoints[4].position.x
  const leftEarXrightEarX = leftEarX - rightEarX
  const LeftEyeXRightEarX = leftEyeX - rightEarX
  // console.log('leftEarXrightEarX:', leftEarXrightEarX)
  keypoints.forEach(keypoint => {
    if (keypoint.score >= minConfidence && keypoint.part === 'nose') {
      const {x, y} = keypoint.position
      const RightEarXNoseX = rightEarX - x
      let hatImg = document.getElementById('flowerHat')
      let fourTimesEars = leftEarXrightEarX * 4
      // let threeFourths = fourTimesEars * 0.75
      // console.log('height:', hatImg.height)
      // console.log('width:', hatImg.width)
      const drawImgDifference = fourTimesEars * 0.7 - RightEarXNoseX
      // console.log('RightEarXNoseX:', RightEarXNoseX)
      canvasContext.beginPath()
      canvasContext.drawImage(
        hatImg, // imgSource, variable set by grabbing photo by id
        0, // sourceX, start drawing image at this x
        0, // sourceY, start drawing image at this y
        hatImg.width, // sourceWidth, crops the image if manipulated, hatImg.width keeps entire image
        hatImg.height, // sourceHeight, crops the image if manipulated, hatImg.height keeps entire image

        // x - hatImg.width * 0.7, // destinationX, x on canvas where top left corner of image sits (noseX minus )
        x - fourTimesEars * 0.7 + 10, // destinationX, x on canvas where top left corner of image sits (noseX minus )

        y - drawImgDifference + LeftEyeXRightEarX + 10, // destinationY, y on canvas where top left corner of image sits
        fourTimesEars, // dWitdth, width to draw the image as in the frame
        fourTimesEars * 0.7 // dHeight, height to draw the image as in the frame
      )
      // canvasContext.arc(x * scale, y * scale, pointRadius, 0, 2 * Math.PI)
      // canvasContext.fillStyle = skeletonColor
      // canvasContext.fill()
    }
  })
}

// // Grammy function :
// export function placeGrammy(
//   keypoints,
//   minConfidence,
//   skeletonColor,
//   canvasContext,
//   scale = 1
// ) {
//   const rightEarX = keypoints[4].position.x
//   const leftEarX = keypoints[3].position.x
//   const leftEarXrightEarX = leftEarX - rightEarX
//   keypoints.forEach(keypoint => {
//     if (keypoint.score >= minConfidence && keypoint.part === 'leftWrist') {
//       const {x, y} = keypoint.position
//       let hatImg = document.getElementById('grammy')
//       canvasContext.beginPath()
//       canvasContext.drawImage(
//         hatImg, // imgSource, variable set by grabbing photo by id
//         0, // sourceX, start drawing image at this x
//         0, // sourceY, start drawing image at this y
//         hatImg.width, // sourceWidth, crops the image if manipulated, hatImg.width keeps entire image
//         hatImg.height, // sourceHeight, crops the image if manipulated, hatImg.height keeps entire image
//         x, // destinationX, x on canvas where top left corner of image sits (noseX minus )
//         y - 100, // destinationY, y on canvas where top left corner of image sits
//         leftEarXrightEarX, // dWitdth, width to draw the image as in the frame
//         leftEarXrightEarX * 1.5924 // dHeight, height to draw the image as in the frame
//       )
//       // canvasContext.arc(x * scale, y * scale, pointRadius, 0, 2 * Math.PI)
//       // canvasContext.fillStyle = skeletonColor
//       // canvasContext.fill()
//     }
//   })
// }

// //Bodysuit function:
// export function placeBodysuit(
//   keypoints,
//   minConfidence,
//   skeletonColor,
//   canvasContext,
//   scale = 1
// ) {
//   const leftShoulderX = keypoints[5].position.x
//   const leftSoulderY = keypoints[5].position.y
//   const rightShoulderX = keypoints[6].position.x
//   const rightShoulderY = keypoints[6].position.y
//   const halfwayBtwShoulders = (leftShoulderX - rightShoulderX) / 2
//   keypoints.forEach(keypoint => {
//     if (keypoint.score >= minConfidence && keypoint.part === 'nose') {
//       const {x, y} = keypoint.position
//       let hatImg = document.getElementById('bodySuit')
//       canvasContext.beginPath()
//       canvasContext.drawImage(
//         hatImg, // imgSource, variable set by grabbing photo by id
//         0, // sourceX, start drawing image at this x
//         0, // sourceY, start drawing image at this y
//         hatImg.width, // sourceWidth, crops the image if manipulated, hatImg.width keeps entire image
//         hatImg.height, // sourceHeight, crops the image if manipulated, hatImg.height keeps entire image
//         halfwayBtwShoulders, // destinationX, x on canvas where top left corner of image sits (noseX minus )
//         rightShoulderY - 150, // destinationY, y on canvas where top left corner of image sits
//         hatImg.width,
//         hatImg.height
//       )
//     }
//   })
// }
