import axios from 'axios'

/**
 * ACTION TYPES
 */
const LOADING_DATA = 'LOADING_DATA'

// by Categories and Single Category
const GET_CATEGORIES = 'GET_CATEGORIES'
const GET_CATEGORY = 'GET_CATEGORY'

/**
 * ACTION CREATORS
 */

const loadingData = () => ({
  type: LOADING_DATA
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
    dispatch(loadingData())
    const {data} = await axios.get('/api/category')
    dispatch(getCategories(data))
  }
}

// One Category with products need the CategoryId
export const fetchCategory = categoryId => {
  return async dispatch => {
    dispatch(loadingData())
    const {data} = await axios.get(`/api/category/${categoryId}`)
    dispatch(getCategory(data))
  }
}

/**
 * INITIAL STATE
 */
const initialState = {
  loading: false,
  categories: [],
  category: {},
  inventories: []
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {...state, loading: true}
    case GET_CATEGORIES:
      return {...state, loading: false, categories: action.categories}
    case GET_CATEGORY:
      return {
        ...state,
        loading: false,
        category: action.category,
        inventories: action.category.inventories
      }
    default:
      return state
  }
}
