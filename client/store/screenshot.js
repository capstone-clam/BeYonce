import axios from 'axios'

/**
 * ACTION TYPES
 */
const LOADING_DATA = 'LOADING_DATA'

const ADD_SCREENSHOT = 'ADD_SCREENSHOT'
const GET_SCREENSHOTS = 'GET_SCREENSHOTS'

/**
 * ACTION CREATORS
 */

const loadingData = () => ({
  type: LOADING_DATA
})

//this selection came from the selected option from the

const addScreenshot = screenshot => ({
  type: ADD_SCREENSHOT,
  screenshot
})

const getScreenshots = (screenshots) => ({
    type: GET_SCREENSHOTS,
    screenshots
})

/**
 * THUNK CREATORS
 */

// All Inventory:

export const fetchScreenshots = () => {
    return async dispatch => {
        try{
            dispatch(loadingData())
            const response = await axios.get('/api/screenshot')
            dispatch(getScreenshots(response.data))

        } catch (error) {
            console.log(error)
        }
    }
}

export const addCapturedScreenshot = screenshot => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/screenshot`, screenshot)
      dispatch(addScreenshot(data))
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * INITIAL STATE
 */
const initialState = {
  loadingScreenshot: false,
  //add category in arr per each category
  screenshots: []
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {...state, loadingScreenshot: true}
    case GET_SCREENSHOTS:
      return {...state, loadingScreenshot: false, screenshots: action.screenshots}
    case ADD_SCREENSHOT:
      return {...state, screenshots: [...state.screenshots, action.screenshot]}
    default:
      return state
  }
}