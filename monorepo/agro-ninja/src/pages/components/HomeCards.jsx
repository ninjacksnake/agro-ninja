import { Card, Col, Row } from "antd";
import React from "react";
import "./HomeCards.css"; // Import the CSS file

const DataCards = ({ chemicals, products, diseases }) => (
  <Row gutter={16} className="card-row">
    <Col span={8}>
      <Card title="Chemicals" bordered={false} className="data-card">
        {chemicals}
      </Card>
    </Col>
    <Col span={8}>
      <Card title="Products" bordered={false} className="data-card">
        {products}
      </Card>
    </Col>
    <Col span={8}>
      <Card title="Diseases" bordered={false} className="data-card">
        {diseases}
      </Card>
    </Col>
  </Row>
);

export default DataCards;
