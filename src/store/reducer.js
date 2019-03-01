

const initialState = {
  restaurants: [],
  status: '',
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_RESTO_SUCCESS':
      return {...state, status: 'fetching success', restaurants: action.payload}
    case 'FETCH_RESTO_ERROR':
      return {...state, status: 'error'}
    case 'ADD_RESTO':
      return {...state, status: 'success'}
    default:
      return state
  }
}
