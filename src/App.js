import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import MenuResto from './components/layout/MenuResto/MenuResto';
import Home from './views/Home/Home';
import ListRestaurant from './views/ListRestaurant/ListRestaurant';
import Search from './views/ListRestaurant/Search';
import InputRestaurant from './views/InputRestaurant/InputRestaurant';
import EditRestaurant from './views/EditRestaurant/EditRestaurant';

import logo from './logo.svg';
import './App.scss';

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Layout className="App__layout">
          <div className="App__header-top">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <Header>
            <MenuResto />
          </Header>
          <Content style={{ padding: '0 50px', marginTop: 64 }}>
            <div style={{ background: '#fff', padding: 24}}>
            <Switch>
              <Route path="/" exact={true} component={Home} />
              <Route path="/search" component={Search} />
              <Route path="/list-restaurant" component={ListRestaurant} />
              <Route path="/input-restaurant" component={InputRestaurant} />
              <Route path="/:id" component={EditRestaurant} />
             
            </Switch> 
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Created by : aztran
          </Footer>
        </Layout>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
