import axios from 'axios'

/**
 * ACTION TYPES
 */
const LOADING_DATA = 'LOADING_DATA'

// const ADD_SELECTION = 'ADD_SELECTION'
const ADD_BODYSUIT = 'ADD_BODYSUIT'
const ADD_HAT = 'ADD_HAT'

/**
 * ACTION CREATORS
 */

const loadingData = () => ({
  type: LOADING_DATA
})

//this selection came from the selected option from the

const addBodysuit = selectedBodysuit => ({
  type: ADD_BODYSUIT,
  selectedBodysuit
})

const addHat = selectedHat => ({
  type: ADD_HAT,
  selectedHat
})

/**
 * THUNKS
 */

export const addBodysuitThunk = inventoryId => {
  return async dispatch => {
    try {
      dispatch(loadingData())
      const {data} = await axios.get(`/api/closet/${inventoryId}`)
      dispatch(addBodysuit(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addHatThunk = inventoryId => {
  return async dispatch => {
    try {
      dispatch(loadingData())
      const {data} = await axios.get(`/api/closet/${inventoryId}`)
      console.log('hat thunk data:', {data})
      dispatch(addHat(data))
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * INITIAL STATE
 */
const initialState = {
  loadingSelection: false,
  //add category in arr per each category
  selectedBodysuit: {},
  selectedHat: {}
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {...state, loadingSelection: false}
    case ADD_BODYSUIT:
      return {
        ...state,
        loadingSelection: false,
        selectedBodysuit: action.selectedBodysuit
      }
    case ADD_HAT:
      return {
        ...state,
        loadingSelection: false,
        selectedHat: action.selectedHat
      }
    default:
      return state
  }
}
