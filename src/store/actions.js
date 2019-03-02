import axios from '../axios';

export const addResto = (name, description) => {
  return dispatch => {
    axios.post('/data.json', {
      Name: name,
      Description: description
    })
    .then(response => {
      dispatch({
        type: 'ADD_RESTO'
      })
    })

  }
}

export const fetchResto = () => {
  return dispatch => {
    axios.get('/data.json')
    .then((res) => {
      let newRestaurants = null;
      newRestaurants = Object.values(res.data);
      for (let i = 0; i < newRestaurants.length; i++) {
        newRestaurants[i]['id'] = Object.keys(res.data)[i];
      }
      dispatch({
        type: 'FETCH_RESTO_SUCCESS',
        payload: newRestaurants
      })
    })
    .catch((error) => {
      dispatch({
        type: 'FETCH_RESTO_ERROR',
        payload: error
      })
    })
  }
}


export const deleteResto = (id) => {
  return dispatch => {
    axios.delete('/data/' + id + '.json')
      .then(response => {
        console.log(response);
        dispatch({
          type: 'DELETE_RESTO',
          payload: response.data
        })
      })
  }
}

export const FetchOne = (id) => {
  return dispatch => {
    axios.get('/data/' + id + '.json')
      .then(res => {
        // console.log(response);
        //console.log(res.data);
        let post = res.data;
        post['id'] = id;
        console.log(post);
        // console.log(id);
        dispatch({
          type: 'FETCH_ONE',
          id: post.id,
          name: post.Name,
          description: post.Description
        })
      })
  }
}

export const updateResto = (id,name, description) => {
  return dispatch => {
    axios.put('/data/' + id + '.json',{
      Name: name,
      Description: description
    })
      .then(response => {
        console.log(response);
        // return;
        dispatch({
          type: 'UPDATE_RESTO',
        })
      })
  }
}
