import { Card, Row, Col } from 'antd';
import './style.css'

interface CustomCardProps {
  title: string;
  content: string | number;
  titleColor?: string;
}

const CustomCard = ({ title, content, titleColor }:CustomCardProps)=> {
  return (
    <Card className="main-dashboard">
      <Card.Grid className="card-grid">
        <Row className='card-content'>
          <Col span={24}>
            <div className="content">{title}</div>
          </Col>
          <Col span={24}>
            <div className="amount" style={{ color: titleColor }}>{content}</div>
          </Col>
        </Row>
      </Card.Grid>
    </Card>
  );
};

export default CustomCard;
