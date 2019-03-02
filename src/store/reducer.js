

const initialState = {
  restaurants: [],
  status: '',
  getResto: [],
  name: '',
  description: '',
  id: '',
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_RESTO_SUCCESS':
      return {...state, status: 'fetching success', restaurants: action.payload}
    case 'FETCH_RESTO_ERROR':
      return {...state, status: 'error'}
    case 'ADD_RESTO':
      return {...state, status: 'success'}
    case 'UPDATE_RESTO':
      return {...state, status: 'success'}
    case 'DELETE_RESTO':
      return {...state, status: 'success'}
    case 'FETCH_ONE':
      // const data = state.getResto.push(action.payload);
      // data.push(action.payload);
      // console.log(action.name);
      return {
          ...state, 
          status: 'success', getResto: action.payload, name: action.name, description: action.description, id: action.id
      }
    default:
      return state
  }
}
