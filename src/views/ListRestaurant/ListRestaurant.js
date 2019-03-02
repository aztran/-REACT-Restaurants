import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchResto, deleteResto, FetchOne } from '../../store/actions';

import { Form, Button, DatePicker, Input, notification, Icon, Divider, Modal} from 'antd';
import Highlighter from 'react-highlight-words';

import BaseTable from '../../components/common/Table/BaseTable';
import { connect } from 'react-redux';

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: 'Success',
    description: 'Data has been deleted'
  });
  
};

class ListRestaurant extends Component {

  state = {
    searchText: '',
    filterDropdownVisible: false,
    visible: false,
    confirmLoading: false,
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

  deleteHandler = (e) => {
    this.props.deleteResto(e);
    this.props.getRestoData();
    openNotificationWithIcon('success');
  }

  componentDidMount () {
    this.props.getRestoData();
  }

  componentDidUpdate(){
    this.props.getRestoData();
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const { visible, confirmLoading } = this.state;
    const columns = [
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
        ...this.getColumnSearchProps('Description'),
      },
      {
        title: 'Action',
        render: (text,record) => (
          <span>
             <Link to={'/' + record.id} key={record.id}>
              <Button type="primary" > Edit</Button>
              </Link>
            <Divider type="vertical" />
            <Button type="danger" onClick={() => this.deleteHandler(record.id)}> Delete</Button>
          </span>
        ) ,
        width: 150,
      }
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

        <Modal
          title={this.state.titleModal}
          visible={visible}
          confirmLoading={confirmLoading}
          footer={[]}
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleSubmit}>
          <Form.Item
            label="Name"
          >
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please Input the title'}],
            })(
              <Input placeholder="Input Title"
                onChange={(event) => this.setState({name: event.target.value})}
              />
            )}
          </Form.Item>

          <Form.Item
            label="Open Time"
          >
            {getFieldDecorator('Date', {
              rules: [{ required: true, message: 'Please Input the Date'}],
            })(
              <DatePicker
                showTime
                placeholder="Select Time"
                onChange={(dateString) => this.setState({description: dateString})}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Submit
            </Button>
            </Form.Item>
        </Form>
        </Modal>
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
    deleteResto: (id) => dispatch(deleteResto(id)),
    loadData: (id) => dispatch(FetchOne(id))
  }
}

const wrapper = Form.create({ name: 'normal_login' })(ListRestaurant);

export default connect(mapStateToProps, mapDispatchToProps) (wrapper);