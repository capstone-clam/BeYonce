import axios from 'axios'

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
    dispatch(loadingCategories())
    const {data} = await axios.get('/api/category')
    dispatch(getCategories(data))
  }
}

// One Category with products need the CategoryId
export const fetchCategory = categoryId => {
  return async dispatch => {
    dispatch(loadingCategory())
    const {data} = await axios.get(`/api/category/${categoryId}`)
    dispatch(getCategory(data))
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
