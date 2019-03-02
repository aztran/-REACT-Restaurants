import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, DatePicker, Input, notification, Form } from 'antd';

import { addResto } from '../../store/actions';
import './InputRestaurant.scss';


const openNotificationWithIcon = (type) => {
  notification[type]({
    message: 'Success',
    description: 'New Restaurant has been saved'
  });
  
};

class InputRestaurant extends Component {
  state = {
    name: '',
    description: '',
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.submitResto(this.state.name, this.state.description);
        openNotificationWithIcon('success');
        this.props.history.replace('/list-restaurant');
      }

    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="input-resto">
        <h1>Add a New Restaurant</h1>
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
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.status,
    restaurants: state.restaurants,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitResto: (name, description) => dispatch(addResto(name, description))
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(InputRestaurant);

export default connect(mapStateToProps, mapDispatchToProps) (WrappedNormalLoginForm);