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
