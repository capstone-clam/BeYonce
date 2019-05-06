import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const LOADING_DATA = 'LOADING_DATA'

// all products -- Maybe we will not use this.
const GET_CLOSET = 'GET_CLOSET'
const GET_CATEGORY_FROM_CLOSET = 'GET_CATEGORY_FROM_CLOSET'

// by Categories and Single Category
const GET_CATEGORIES = 'GET_CATEGORIES'
const GET_CATEGORY = 'GET_CATEGORY'

/**
 * ACTION CREATORS
 */

const loadingData = () => ({
  type: LOADING_DATA
})

const getCloset = item => ({
  type: GET_CLOSET, 
  item
})

const getCategoryFromCloset = (category) => ({
  type: GET_CATEGORY_FROM_CLOSET,
  category
})

const getCategories = categories => ({
  type: GET_CATEGORIES,
  categories
})

const getCategory = category => ({
  type: GET_CATEGORY,
  category
})
/**
 * THUNK CREATORS
 */
// All Inventory:
export const fetchCloset = () => {
  return async dispatch => {
    dispatch(loadingData())
    const res = await axios.get('/api/closet')
    dispatch(getCloset(res))
  }
}

export const fetchCategoryFromCloset = (categoryid) => {
  return async dispatch => {
    dispatch(loadingData())
    const res = await axios.get(`/api/closet/${categoryid}`)
    dispatch(getCategoryFromCloset(res))
  }
}

// All Categories
export const fetchCategories = () => {
  return async dispatch => {
    dispatch(loadingData())
    const res = await axios.get('/api/category')
    console.log("reached fecthCategories thunk")
    dispatch(getCategories(res))
  }
}

// One Category with products need the CategoryId
export const fetchCategory = id => {
  return async dispatch => {
    dispatch(loadingData())
    const res = await axios.get(`/api/category/${id}`)
    dispatch(getCategory(res))
  }
}

/**
 * INITIAL STATE
 */
const initialState = {
  loading: false,
  closet: [],
  categories: [],
  category: []
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {...state, loading: true}
    case GET_CLOSET:
      return {...state, loading: false, closet: action.closet}
    case GET_CATEGORIES:
      return {...state, loading: false, categories: action.categories}
    case GET_CATEGORY:
      return {...state, loading: false, category: action.closet}
    case GET_CATEGORY_FROM_CLOSET:
      return {...state, loading: false, category: action.category}

    default:
      return state
  }
}
