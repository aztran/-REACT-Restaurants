import React, { Component } from 'react';
import axios from '../../axios';

import BaseCard from '../../components/common/Card/BaseCard';
import { Pagination, Row, Col, Select, Input } from 'antd';
import { connect } from 'react-redux';



import './Search.scss';

import { fetchResto} from '../../store/actions';

class Search extends Component {

  state = {
    selectValue: '',
    isLoading: true,
    photos: [],
    minValue: 0,
    maxValue: 10,
    cardResto: [],
    items: [],
    initialItems: [
      "Apples",
      "Broccoli",
      "Chicken",
      "Duck",
      "Eggs",
      "Fish",
      "Granola",
      "Hash Browns"
    ],
  }

  componentWillMount() {
   
  }

  componentDidMount () {
    this.fetchData();
  }

  fetchData = () => {
    axios.get('/data.json')
    .then((res) => {
      this.setState({ isLoading: false });
      let newRestaurants = null;
      newRestaurants = Object.values(res.data);
      for (let i = 0; i < newRestaurants.length; i++) {
        newRestaurants[i]['id'] = Object.keys(res.data)[i];
      }
      this.setState({cardResto: newRestaurants, items: newRestaurants});
      console.log('card', this.state.cardResto);
      console.log('item', this.state.items);
    })
  }

  handleChange = value => {
    if (value <= 1) {
      this.setState({
        minValue: 0,
        maxValue: 10
      });
    } else {
      this.setState({
        minValue: this.state.maxValue,
        maxValue: value * 10
      });
    }
  };

  handleSelect = value => {
    this.setState({selectValue: value})
  }

  filterList = event => {
    let updateList = this.state.cardResto;
    if (this.state.selectValue === 'name'){
      updateList = updateList.filter(item  => {
        return item.Name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1
      });
    }
    else if(this.state.selectValue === 'open') {
      updateList = updateList.filter(item  => {
        return item.Description.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1
      });
    }
  
    
    console.log(updateList);
    this.setState({items: updateList, minValue: 0});
  }

  render() {
    let cardResto = this.state.items;
    const Option = Select.Option;

    return (
      <div>
        <div className="searchBar">
          Filtered By :
          <Select defaultValue="selected" style={{ width: 120 }} onChange={this.handleSelect}>
            <Option value="selected" disabled>Select</Option>
            <Option value="name">Name</Option>
            <Option value="open">Open </Option>
           
          </Select>
          {}
          <Input type="text" className="form-control form-control-lg" placeholder="Search Restaurant" onChange={this.filterList}/>
        </div>
        <Row>
            {cardResto && cardResto.length > 0 && cardResto.slice(this.state.minValue, this.state.maxValue).map(val => (
              <Col span={12} key={val.id}> 
              <div className="card">
                <BaseCard 
                  loading={this.state.isLoading}
                  title={val.Name}
                  date={val.Description}
                />
              </div>
              </Col>
            ))}
          </Row>
          <Pagination
            defaultCurrent={1}
            onChange={this.handleChange}
            total={cardResto.length}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            pageSize={10}
          />
      </div>
    )
  }
  
}

const mapStateToProps = (state) => {
  return {
    data: state.restaurants,
    resto: state.getResto
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRestoData: () => dispatch(fetchResto()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Search);