import React from 'react';
import { Card } from 'antd';

const BaseCard = (props) => (

  <Card
    title={props.title}
    loading={props.loading}
    style={{ width: 500 }}
    >
    <h2>Open :</h2>
    <p>{props.date}</p>
  </Card>
);


export default BaseCard;