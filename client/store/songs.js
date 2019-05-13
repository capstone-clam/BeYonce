import axios from 'axios'

//action types
const LOADING_SONGS = 'LOADING_SONGS'
const GET_SONGS = 'GET_SONGS'

//action creators
const loadingSongs = () => ({
  type: LOADING_SONGS
})

const gotSongs = songs => ({
  type: GET_SONGS,
  songs
})

//thunk creators

export const fetchSongs = categoryId => {
  return async dispatch => {
    try {
      dispatch(loadingSongs())
      const {data} = await axios.get(`/api/category/${categoryId}`)
      dispatch(gotSongs(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {
  loadingSongs: false,
  songs: {},
  inventories: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_SONGS:
      return {...state, loadingSongs: true}
    case GET_SONGS:
      return {
        ...state,
        loadingSongs: false,
        songs: action.songs,
        inventories: action.songs.inventories
      }
    default:
      return state
  }
}
