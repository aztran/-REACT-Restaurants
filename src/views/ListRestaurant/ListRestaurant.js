import React, { Component } from 'react';

import { fetchResto } from '../../store/actions';

import { Button, Input, Icon} from 'antd';
import Highlighter from 'react-highlight-words';

import BaseTable from '../../components/common/Table/BaseTable';
import { connect } from 'react-redux';

class ListRestaurant extends Component {

  state = {
    searchText: '',
    filterDropdownVisible: false,
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => { this.searchInput = node; }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  })

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  }


  componentDidMount () {
    this.props.getRestoData();
  }

  componentDidUpdate() {
    this.props.getRestoData();
  }

  render () {
    const  columns = [
      {
        title: 'Name',
        dataIndex: 'Name',
        key: 'Name',
        ...this.getColumnSearchProps('Name'),
      },
      {
        title: 'Description',
        dataIndex: 'Description',
        key: 'Description',
      },
      // onFilter: (value, record) => record.address.indexOf(value) === 0,
    ];

    return (
      <div>
        <h2>Data Restaurants</h2>
         <BaseTable
          id="id"
          loading={this.state.isLoading}
          data={this.props.data}
          columns={columns}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.restaurants
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRestoData: () => dispatch(fetchResto())
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ListRestaurant);