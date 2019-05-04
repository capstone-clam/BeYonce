import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CLOSET = 'GET_CLOSET'

/**
 * INITIAL STATE
 */
const closet = {}

/**
 * ACTION CREATORS
 */
const getCloset = item => ({type: GET_CLOSET, item})

/**
 * THUNK CREATORS
 */
export const fetchCloset = () => async dispatch => {
  try {
    const res = await axios.get(`api/closet/${id}`)
    dispatch(getCloset(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = closet, action) {
  switch (action.type) {
    case GET_CLOSET:
      return action.item
    default:
      return state

  }
}
