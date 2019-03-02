
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

const MenuResto = () => (
  <Menu
    theme="dark"
    mode="horizontal"
    defaultSelectedKeys={['1']}
    style={{ lineHeight: '64px' }}
  >
    <Menu.Item key="1">
      Home
      <Link to="/" />
    </Menu.Item>
    <Menu.Item key="2">
      List Restaurants
      <Link to="/list-restaurant" />
    </Menu.Item>
    <Menu.Item key="3">
      Add New Restaurant
    <Link to="/input-restaurant" />
    </Menu.Item>
  </Menu>
)

export default MenuResto;