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
export function placeHat(keypoints, minConfidence, canvasContext, scale = 1) {
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

  const hatImg = document.getElementById('hat')

  const type = hatImg.alt

  switch (type) {
    case 'orangeHat':
      keypoints.forEach(keypoint => {
        if (keypoint.score >= minConfidence && keypoint.part === 'nose') {
          const {x, y} = keypoint.position
          const RightEarXNoseX = rightEarX - x
          let threeTimesEars = leftEarXrightEarX * 3
          const drawImgDifference = threeTimesEars * 0.7 - RightEarXNoseX
          const halfDrawImg = drawImgDifference / 2
          canvasContext.beginPath()
          canvasContext.drawImage(
            hatImg,
            0,
            0,
            hatImg.width,
            hatImg.height,
            x - halfDrawImg - noseYleftEyeY,
            y - timesTwo,
            threeTimesEars,
            threeTimesEars * 0.5
          )
        }
      })
      break

    case 'flowerHat':
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
      break

    case 'finalcrown':
      keypoints.forEach(keypoint => {
        if (keypoint.score >= minConfidence && keypoint.part === 'nose') {
          const {x, y} = keypoint.position
          const threeTimesEars = leftEarXrightEarX * 3
          const oneHalfTimesEars = threeTimesEars / 2.1
          const height = oneHalfTimesEars * 1.3
          canvasContext.beginPath()
          canvasContext.drawImage(
            hatImg,
            0,
            0,
            hatImg.width,
            hatImg.height,
            x - oneHalfTimesEars,
            y - height,
            threeTimesEars,
            threeTimesEars * 0.715
          )
        }
      })
      break

    case 'beadedCrown':
      keypoints.forEach(keypoint => {
        if (keypoint.score >= minConfidence && keypoint.part === 'nose') {
          const {x, y} = keypoint.position
          const twoTimesEars = leftEarXrightEarX * 2
          const oneHalfTimesEars = twoTimesEars / 2
          const height = oneHalfTimesEars * 2
          canvasContext.beginPath()
          canvasContext.drawImage(
            hatImg,
            0,
            0,
            hatImg.width,
            hatImg.height,
            x - oneHalfTimesEars,
            y - height,
            twoTimesEars,
            twoTimesEars * 1.1375
          )
        }
      })
      break

    case 'barbieBodysuit':
      console.log('Barbie Bodysuit')
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
      console.log('Gold Bodysuit')
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
      console.log('Red Bodysuit')
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
      console.log('Pearl Bodysuit')
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
