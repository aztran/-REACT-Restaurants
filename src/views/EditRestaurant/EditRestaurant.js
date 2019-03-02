import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Input, notification, Form } from 'antd';

import { addResto, updateResto} from '../../store/actions';
// import './InputRestaurant.scss';


const openNotificationWithIcon = (type) => {
  notification[type]({
    message: 'Success',
    description: 'New Restaurant has been saved'
  });
  
};

class EditRestaurant extends Component {
  state = {
    name: '',
    description: '',
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.updateResto(this.props.match.params.id, this.state.name, this.state.description);
        openNotificationWithIcon('success');
        this.props.history.replace('/list-restaurant');
      }

    });
  }

  loadData() {
    const id=this.props.match.params.id;
    console.log(id);
    this.props.loadData(id);
    this.props.form.setFieldsValue({
      title: this.props.name,
      description: this.props.description,
      id: id
    })
    console.log(this.props.name);
  }

  // componentDidUpdate() {
  //   this.loadData();
  // }
  componentDidMount() {
   this.loadData();
    
  }


  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="input-resto">
        <h1>Edit Restaurant</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('id', {
              rules: [{ required: false, message: 'Please Input the title'}],
            })(
              <Input type="hidden"
              />
            )}
          </Form.Item>
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
            {getFieldDecorator('description', {
              rules: [{ required: true, message: 'Please Input the Date'}],
            })(
             
              <Input placeholder="Input Description"
                onChange={(event) => this.setState({description: event.target.value})}
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
    resto: state.getResto,
    name: state.name,
    description: state.description,
    id: state.id,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitResto: (name, description) => dispatch(addResto(name, description)),
    updateResto: (id, name, description) => dispatch(updateResto(id, name, description))
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(EditRestaurant);

export default connect(mapStateToProps, mapDispatchToProps) (WrappedNormalLoginForm);