import { useRecoilValue } from "recoil";
import {Card,Typography,Avatar,Row,Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { fetchUserSelector } from "../store/ProfileSelectors";
import './style.css'

const { Title, Text } = Typography;
const ProfileList = () => {
    const user= useRecoilValue(fetchUserSelector)
    console.log("name in profile",user,typeof user)

    return (
        <div className="profile-page">
          <Card bordered={false} className="profile-card">
        <Row>
          <Col span={16}>
            <Row gutter={[0, 16]} className="profile-details">
              <Col span={24}>
                <Title level={4} className="profile-item">
                  <Text strong>Name: </Text>
                  <Text className="profile-value">{user[0].name}</Text>
                </Title>
              </Col>
              <Col span={24}>
                <Title level={4} className="profile-item">
                  <Text strong>Email: </Text>
                  <Text className="profile-value">{user[0].email}</Text>
                </Title>
              </Col>
              <Col span={24}>
                <Title level={4} className="profile-item">
                  <Text strong>Default Currency: </Text>
                  <Text className="profile-value">{user[0].default_currency}</Text>
                </Title>
              </Col>
            </Row>
          </Col>
          <Col span={8} className="profile-image">
            <Avatar size={150} icon={<UserOutlined />} />
          </Col>
        </Row>
      </Card>
        </div>
      );

};

export default ProfileList;