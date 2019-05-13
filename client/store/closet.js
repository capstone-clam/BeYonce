import axios from 'axios'
import {nextFrame} from '@tensorflow/tfjs'

/**
 * ACTION TYPES
 */
const LOADING_CATEGORIES = 'LOADING_CATEGORIES'
const LOADING_CATEGORY = 'LOADING_CATEGORY'

// by Categories and Single Category
const GET_CATEGORIES = 'GET_CATEGORIES'
const GET_CATEGORY = 'GET_CATEGORY'

/**
 * ACTION CREATORS
 */

const loadingCategories = () => ({
  type: LOADING_CATEGORIES
})

const loadingCategory = () => ({
  type: LOADING_CATEGORY
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

// All Categories
export const fetchCategories = () => {
  return async dispatch => {
    try {
      dispatch(loadingCategories())
      const {data} = await axios.get('/api/category')
      dispatch(getCategories(data))
    } catch (err) {
      console.error(err)
    }
  }
}

// One Category with products need the CategoryId
export const fetchCategory = categoryId => {
  return async dispatch => {
    try {
      dispatch(loadingCategory())
      const {data} = await axios.get(`/api/category/${categoryId}`)
      dispatch(getCategory(data))
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * INITIAL STATE
 */
const initialState = {
  loadingCategories: false,
  loadingCategory: false,

  categories: [],
  category: {},
  inventories: []
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_CATEGORIES:
      return {...state, loadingCategories: true}
    case GET_CATEGORIES:
      return {...state, loadingCategories: false, categories: action.categories}

    case LOADING_CATEGORY:
      return {...state, loadingCategory: true}
    case GET_CATEGORY:
      return {
        ...state,
        loadingCategory: false,
        category: action.category,
        inventories: action.category.inventories
      }
    default:
      return state
  }
}
