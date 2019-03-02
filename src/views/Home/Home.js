import React, { Component } from 'react';

import { Divider } from 'antd';

import './Home.scss';

class Home extends Component {

  render() {
    return (
      <div>
        <h1>Web Application</h1>
        <h2>The Restaurants</h2>
        <Divider/>
        <span>Web App Using React, React REdux and Firebase For Fetching Data</span>
        <div className="list">
          <h3>You can :</h3>
          <ul>
            <li>View List Restaurants</li>
            <li>Add a new Restaurant</li>
            <li>Delete Restaurant</li>
            <li>Update Restaurant</li>
          </ul>
        </div>
      </div>
    )
  }
  
}

export default Home;