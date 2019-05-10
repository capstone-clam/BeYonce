// ORANGE HAT :
export function placeHat(
  keypoints,
  minConfidence,
  skeletonColor,
  canvasContext,
  scale = 1
) {
  const rightEarX = keypoints[4].position.x
  const leftEarX = keypoints[3].position.x

  const leftEarXrightEarX = leftEarX - rightEarX
  const timesTwo = leftEarXrightEarX * 1.3

  const leftEyeY = keypoints[1].position.y
  const noseY = keypoints[0].position.y
  const noseYleftEyeY = noseY - leftEyeY

  keypoints.forEach(keypoint => {
    if (keypoint.score >= minConfidence && keypoint.part === 'nose') {
      const {x, y} = keypoint.position
      const RightEarXNoseX = rightEarX - x //negative number
      let hatImg = document.getElementById('flowerHat')
      let threeTimesEars = leftEarXrightEarX * 3
      const drawImgDifference = threeTimesEars * 0.7 - RightEarXNoseX
      const halfDrawImg = drawImgDifference / 2
      canvasContext.beginPath()
      canvasContext.drawImage(
        hatImg, // imgSource, variable set by grabbing photo by id
        0, // sourceX, start drawing image at this x
        0, // sourceY, start drawing image at this y
        hatImg.width, // sourceWidth, crops the image if manipulated, hatImg.width keeps entire image
        hatImg.height, // sourceHeight, crops the image if manipulated, hatImg.height keeps entire image
        x - halfDrawImg - noseYleftEyeY, // destinationX, x on canvas where top left corner of image sits (noseX minus )
        y - timesTwo, // destinationY, y on canvas where top left corner of image sits
        threeTimesEars, // dWitdth, width to draw the image as in the frame
        threeTimesEars * 0.5 // dHeight, height to draw the image as in the frame
      )
canvasContext.arc(x * scale, y * scale, pointRadius, 0, 2 * Math.PI)
canvasContext.fillStyle = skeletonColor
canvasContext.fill()
    }
  })
}

// FLOWER HAT :
// export function placeHat(
//   keypoints,
//   minConfidence,
//   skeletonColor,
//   canvasContext,
//   scale = 1
// ) {
//   const rightEarX = keypoints[4].position.x
//   const leftEarX = keypoints[3].position.x
//   const leftEyeX = keypoints[1].position.x
//   // const rightEarX = keypoints[4].position.x
//   const leftEarXrightEarX = leftEarX - rightEarX
//   const LeftEyeXRightEarX = leftEyeX - rightEarX
//   // console.log('leftEarXrightEarX:', leftEarXrightEarX)
//   keypoints.forEach(keypoint => {
//     if (keypoint.score >= minConfidence && keypoint.part === 'nose') {
//       const {x, y} = keypoint.position
//       const RightEarXNoseX = rightEarX - x
//       let hatImg = document.getElementById('flowerHat')
//       let fourTimesEars = leftEarXrightEarX * 4
//       // let threeFourths = fourTimesEars * 0.75
//       // console.log('height:', hatImg.height)
//       // console.log('width:', hatImg.width)
//       const drawImgDifference = fourTimesEars * 0.7 - RightEarXNoseX
//       // console.log('RightEarXNoseX:', RightEarXNoseX)
//       canvasContext.beginPath()
//       canvasContext.drawImage(
//         hatImg, // imgSource, variable set by grabbing photo by id
//         0, // sourceX, start drawing image at this x
//         0, // sourceY, start drawing image at this y
//         hatImg.width, // sourceWidth, crops the image if manipulated, hatImg.width keeps entire image
//         hatImg.height, // sourceHeight, crops the image if manipulated, hatImg.height keeps entire image

//         // x - hatImg.width * 0.7, // destinationX, x on canvas where top left corner of image sits (noseX minus )
//         x - fourTimesEars * 0.7 + 10, // destinationX, x on canvas where top left corner of image sits (noseX minus )

//         y - drawImgDifference + LeftEyeXRightEarX + 10, // destinationY, y on canvas where top left corner of image sits
//         fourTimesEars, // dWitdth, width to draw the image as in the frame
//         fourTimesEars * 0.7 // dHeight, height to draw the image as in the frame
//       )
//       // canvasContext.arc(x * scale, y * scale, pointRadius, 0, 2 * Math.PI)
//       // canvasContext.fillStyle = skeletonColor
//       // canvasContext.fill()
//     }
//   })
// }

// GOLD CROWN:
// export function placeHat(
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
//     if (keypoint.score >= minConfidence && keypoint.part === 'nose') {
//       const {x, y} = keypoint.position
//       let hatImg = document.getElementById('flowerHat')
//       const threeTimesEars = leftEarXrightEarX * 3
//       const oneHalfTimesEars = threeTimesEars / 2.1
//       const height = oneHalfTimesEars * 1.3
//       canvasContext.beginPath()
//       canvasContext.drawImage(
//         hatImg, // imgSource, variable set by grabbing photo by id
//         0, // sourceX, start drawing image at this x
//         0, // sourceY, start drawing image at this y
//         hatImg.width, // sourceWidth, crops the image if manipulated, hatImg.width keeps entire image
//         hatImg.height, // sourceHeight, crops the image if manipulated, hatImg.height keeps entire image
//         x - oneHalfTimesEars, // destinationX, x on canvas where top left corner of image sits (noseX minus )
//         y - height, // destinationY, y on canvas where top left corner of image sits
//         threeTimesEars, // dWitdth, width to draw the image as in the frame
//         threeTimesEars * 0.715 // dHeight, height to draw the image as in the frame
//       )
//       // canvasContext.arc(x * scale, y * scale, pointRadius, 0, 2 * Math.PI)
//       // canvasContext.fillStyle = skeletonColor
//       // canvasContext.fill()
//     }
//   })
// }

// BEADED CROWN :
// export function placeHat(
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
//     if (keypoint.score >= minConfidence && keypoint.part === 'nose') {
//       const {x, y} = keypoint.position
//       let hatImg = document.getElementById('flowerHat')
//       const twoTimesEars = leftEarXrightEarX * 2
//       const oneHalfTimesEars = twoTimesEars / 2
//       const height = oneHalfTimesEars * 2
//       canvasContext.beginPath()
//       canvasContext.drawImage(
//         hatImg, // imgSource, variable set by grabbing photo by id
//         0, // sourceX, start drawing image at this x
//         0, // sourceY, start drawing image at this y
//         hatImg.width, // sourceWidth, crops the image if manipulated, hatImg.width keeps entire image
//         hatImg.height, // sourceHeight, crops the image if manipulated, hatImg.height keeps entire image
//         x - oneHalfTimesEars, // destinationX, x on canvas where top left corner of image sits (noseX minus )
//         y - height, // destinationY, y on canvas where top left corner of image sits
//         twoTimesEars, // dWitdth, width to draw the image as in the frame
//         twoTimesEars * 1.1375 // dHeight, height to draw the image as in the frame
//       )
//       // canvasContext.arc(x * scale, y * scale, pointRadius, 0, 2 * Math.PI)
//       // canvasContext.fillStyle = skeletonColor
//       // canvasContext.fill()
//     }
//   })
// }
