const TAKE_SNAPSHOT = 'TAKE_SNAPSHOT'
const LIGHTBOX_OFF = 'LIGHTBOX_OFF'

export const takeSnapshot = imageStr => {
  return {
    type: TAKE_SNAPSHOT,
    imageStr
  }
}

export const lightboxOff = () => {
  return {
    type: LIGHTBOX_OFF
  }
}

export default function(state = {showLightbox: false, imageStr: ''}, action) {
  switch (action.type) {
    case TAKE_SNAPSHOT:
      return {showLightbox: true, imageStr: action.imageStr}
    case LIGHTBOX_OFF:
      return {imageStr: '', showLightbox: false}
    default:
      return state
  }
}