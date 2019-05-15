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

// HAT FUNCTIONS
// eslint-disable-next-line complexity
export function placeBodysuit(
  keypoints,
  minConfidence,
  canvasContext,
  scale = 1
) {
  const rightEarX = keypoints[4].position.x
  const leftEarX = keypoints[3].position.x
  const leftEyeX = keypoints[1].position.x

  //left Eear Right Ear
  const leftEarXrightEarX = leftEarX - rightEarX

  const leftEyeXRightEarX = leftEyeX - rightEarX

  const timesTwo = leftEarXrightEarX * 1.3
  const leftEyeY = keypoints[1].position.y
  const noseY = keypoints[0].position.y
  const noseYleftEyeY = noseY - leftEyeY

  //Bodysuit variables :

  const leftShoulderX = keypoints[5].position.x
  const rightShoulderX = keypoints[6].position.x
  const rightShoulderY = keypoints[6].position.y
  const shoulderDistance = leftShoulderX - rightShoulderX
  const twoThirds = shoulderDistance * 0.7
  const halfwayBtwShoulders = (leftShoulderX - rightShoulderX) / 2
  const fifthBtwShoulders = (leftShoulderX - rightShoulderX) / 5
  const forthBtwShoulders = (leftShoulderX - rightShoulderX) / 4

  const hatImg = document.getElementById('bodysuit')

  const type = hatImg.alt

  switch (type) {
    case 'barbieBodysuit':
      keypoints.forEach(keypoint => {
        if (keypoint.score >= minConfidence && keypoint.part === 'nose') {
          const {x, y} = keypoint.position
          canvasContext.beginPath()
          canvasContext.drawImage(
            hatImg, // imgSource, variable set by grabbing photo by id
            0, // sourceX, start drawing image at this x
            0, // sourceY, start drawing image at this y
            hatImg.width, // sourceWidth, crops the image if manipulated, hatImg.width keeps entire image
            hatImg.height, // sourceHeight, crops the image if manipulated, hatImg.height keeps entire image
            x - twoThirds, // destinationX, x on canvas where top left corner of image sits
            rightShoulderY - fifthBtwShoulders, // destinationY, y on canvas where top left corner of image sits
            shoulderDistance * 1.5,
            halfwayBtwShoulders * 4.5
          )
        }
      })
      break

    case 'goldBodysuit':
      keypoints.forEach(keypoint => {
        if (keypoint.score >= minConfidence && keypoint.part === 'nose') {
          const {x, y} = keypoint.position
          canvasContext.beginPath()
          canvasContext.drawImage(
            hatImg, // imgSource, variable set by grabbing photo by id
            0, // sourceX, start drawing image at this x
            0, // sourceY, start drawing image at this y
            hatImg.width, // sourceWidth, crops the image if manipulated, hatImg.width keeps entire image
            hatImg.height, // sourceHeight, crops the image if manipulated, hatImg.height keeps entire image
            x - twoThirds, // destinationX, x on canvas where top left corner of image sits
            rightShoulderY - forthBtwShoulders, // destinationY, y on canvas where top left corner of image sits
            shoulderDistance * 1.5,
            halfwayBtwShoulders * 4.2
          )
        }
      })
      break

    case 'redBodysuit':
      keypoints.forEach(keypoint => {
        if (keypoint.score >= minConfidence && keypoint.part === 'nose') {
          const {x, y} = keypoint.position
          canvasContext.beginPath()
          canvasContext.drawImage(
            hatImg, // imgSource, variable set by grabbing photo by id
            0, // sourceX, start drawing image at this x
            0, // sourceY, start drawing image at this y
            hatImg.width, // sourceWidth, crops the image if manipulated, hatImg.width keeps entire image
            hatImg.height, // sourceHeight, crops the image if manipulated, hatImg.height keeps entire image
            x - twoThirds, // destinationX, x on canvas where top left corner of image sits
            rightShoulderY - forthBtwShoulders, // destinationY, y on canvas where top left corner of image sits
            shoulderDistance * 1.4,
            halfwayBtwShoulders * 4.1
          )
        }
      })
      break

    case 'pearlBodysuit':
      keypoints.forEach(keypoint => {
        if (keypoint.score >= minConfidence && keypoint.part === 'nose') {
          const {x, y} = keypoint.position
          canvasContext.beginPath()
          canvasContext.drawImage(
            hatImg, // imgSource, variable set by grabbing photo by id
            0, // sourceX, start drawing image at this x
            0, // sourceY, start drawing image at this y
            hatImg.width, // sourceWidth, crops the image if manipulated, hatImg.width keeps entire image
            hatImg.height, // sourceHeight, crops the image if manipulated, hatImg.height keeps entire image
            x - twoThirds - 15, // destinationX, x on canvas where top left corner of image sits
            rightShoulderY - forthBtwShoulders, // destinationY, y on canvas where top left corner of image sits
            shoulderDistance * 1.7,
            halfwayBtwShoulders * 4.5
          )
        }
      })
      break

    default:
      return null
  }
}
