import React from 'react';
import { Menu, Dropdown, Avatar, Row, Col, Typography } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { userNameSelector } from 'pages/login/Login/store/LoginSelector';
import { userData } from 'pages/login/Login/store/LoginAtoms';
import './style.css';

const { Link } = Typography

const UserProfile = () => {
  const userName = useRecoilValue(userNameSelector);
  const resetUserData = useResetRecoilState(userData);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    resetUserData();
    navigate('/');
  };

  const menu = (
    <Menu className="menu">
      <Menu.Item key="1">Profile</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" onClick={handleLogout}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <Row className="user-profile">
      <Dropdown overlay={menu} trigger={['click']}>
        <Typography.Link className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <Avatar size="large" icon={<UserOutlined />} />
          <Col className="user-name">{userName}</Col>
          <DownOutlined />
        </Typography.Link>
      </Dropdown>
    </Row>
  );
};

export default UserProfile;
