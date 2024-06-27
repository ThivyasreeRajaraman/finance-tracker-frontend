import React from 'react';
import { Spin, Row, Col } from 'antd';
import './style.css'; // Import your CSS file for styling

const LoadingIndicator = () => {
  return (
    <Row className="loading-container">
      <Col>
        <Spin size="large" />
      </Col>
    </Row>
  );
};

export default LoadingIndicator;
