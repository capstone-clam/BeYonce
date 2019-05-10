import * as posenet from '@tensorflow-models/posenet'

function toTuple({x, y}) {
  return [x, y]
}

function drawSegment(
  [firstX, firstY],
  [nextX, nextY],
  color,
  lineWidth,
  scale = 1,
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

// HAT FUNCTION
export function placeHat(keypoints, minConfidence, canvasContext, item) {
  const rightEarX = keypoints[4].position.x
  const leftEarX = keypoints[3].position.x
  const leftEyeX = keypoints[1].position.x
  const leftEarXrightEarX = leftEarX - rightEarX
  const leftEyeXRightEarX = leftEyeX - rightEarX

  const timesTwo = leftEarXrightEarX * 1.3
  const noseYleftEyeY = noseY - leftEyeY
  const leftEyeY = keypoints[1].position.y
  const noseY = keypoints[0].position.y

  var hatImg = document.getElementById('hat')

  console.log('hats', hatImg)
  console.log('hatsVALUE', hatImg.alt)

  var type = hatImg.alt
  if (type === 'hats') {
    // if (type === 'flowerHat') {
    keypoints.forEach(keypoint => {
      if (keypoint.score >= minConfidence && keypoint.part === 'nose') {
        const {x, y} = keypoint.position
        const RightEarXNoseX = rightEarX - x
        let fourTimesEars = leftEarXrightEarX * 4
        const drawImgDifference = fourTimesEars * 0.7 - RightEarXNoseX
        canvasContext.beginPath()
        canvasContext.drawImage(
          hatImg,
          0,
          0,
          hatImg.width,
          hatImg.height,
          x - fourTimesEars * 0.7 + 10,
          y - drawImgDifference + leftEyeXRightEarX + 10,
          fourTimesEars,
          fourTimesEars * 0.7
        )
      }
    })
  }
}
