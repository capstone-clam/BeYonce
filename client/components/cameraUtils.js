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

// Flower hat function:

//https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage

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
  console.log('leftEarXrightEarX:', leftEarXrightEarX)
  keypoints.forEach(keypoint => {
    if (keypoint.score >= minConfidence && keypoint.part === 'nose') {
      const {x, y} = keypoint.position
      const RightEarXNoseX = rightEarX - x
      let hatImg = document.getElementById('flowerHat')
      let fourTimesEars = leftEarXrightEarX * 4
      // let threeFourths = fourTimesEars * 0.75
      console.log('height:', hatImg.height)
      console.log('width:', hatImg.width)
      const drawImgDifference = fourTimesEars * 0.7 - RightEarXNoseX
      console.log('RightEarXNoseX:', RightEarXNoseX)
      canvasContext.beginPath()
      canvasContext.drawImage(
        hatImg, // imgSource, variable set by grabbing photo by id
        0, // sourceX, start drawing image at this x
        0, // sourceY, start drawing image at this y
        hatImg.width, // sourceWidth, crops the image if manipulated, hatImg.width keeps entire image
        hatImg.height, // sourceHeight, crops the image if manipulated, hatImg.height keeps entire image
        x - fourTimesEars * 0.7, // destinationX, x on canvas where top left corner of image sits
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
