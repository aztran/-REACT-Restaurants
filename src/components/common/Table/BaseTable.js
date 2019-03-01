import React, { Component } from 'react';
import { Table } from 'antd';
class BaseTable extends Component {

  state= {
    posts: [],
  }
  render() {
    return (
      <div>
        <Table
          rowKey={this.props.id}
          dataSource={this.props.data}
          loading={this.props.loading}
          bordered={true}
          scroll={{ x: 1300 }}
          columns={this.props.columns}
        />
      </div>
    )
  }
};

export default BaseTable;