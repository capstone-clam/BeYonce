import axios from 'axios'

/**
 * ACTION TYPES
 */
const LOADING_DATA = 'LOADING_DATA'

// const ADD_SELECTION = 'ADD_SELECTION'
const ADD_BODYSUIT = 'ADD_BODYSUIT'
const ADD_HAT = 'ADD_HAT'
const ADD_CATEGORY = 'ADD_CATEGORY'
const REMOVE_CATEGORY = 'REMOVE_CATEGORY'
const REMOVE_ALL = 'REMOVE_ALL'

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

const addCategory = selectedCategory => ({
  type: ADD_CATEGORY,
  selectedCategory
})

export const reset = () => ({type: REMOVE_CATEGORY})

export const removeAll = () => ({type: REMOVE_ALL})

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
      dispatch(addHat(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addCategoryThunk = categoryId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/category/${categoryId}`)
      dispatch(addCategory(data))
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
  selectedCategory: {},
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
    case ADD_CATEGORY:
      return {
        ...state,
        loadingSelection: false,
        selectedCategory: action.selectedCategory
      }
    case REMOVE_CATEGORY:
      return {...state, selectedCategory: {}}

    case REMOVE_ALL:
      return {...state, selectedBodysuit: {}, selectedHat: {}}
    default:
      return state
  }
}
