import axios from 'axios'

/**
 * ACTION TYPES
 */
const LOADING_DATA = 'LOADING_DATA'

const ADD_SELECTION = 'ADD_SELECTION'

/**
 * ACTION CREATORS
 */

const loadingData = () => ({
  type: LOADING_DATA
})

//this selection came from the selected option from the

const addSelection = selection => ({
  type: ADD_SELECTION,
  selection
})

/**
 * THUNK CREATORS
 */

// All Inventory:

export const addSelectedItem = inventoryId => {
  return async dispatch => {
    dispatch(loadingData())
    const {data} = await axios.get(`/api/closet/${inventoryId}`)
    dispatch(addSelection(data))
  }
}

/**
 * INITIAL STATE
 */
const initialState = {
  loading: false,
  selection: {}
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {...state, loading: true}
    case ADD_SELECTION:
      return {...state, loading: false, selection: action.selection}
    default:
      return state
  }
}
