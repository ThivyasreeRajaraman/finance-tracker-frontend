import React from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { userNameSelector } from 'pages/login/Login/store/LoginSelector';
import { userData } from 'pages/login/Login/store/LoginAtoms';
import './style.css';

const UserMenu: React.FC = () => {
  const userName = useRecoilValue(userNameSelector);
  const resetUserData = useResetRecoilState(userData);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('currency');
    resetUserData();
    navigate(-1);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const menu = (
    <Menu className="menu">
      <Menu.Item key="1" onClick={handleProfileClick}>Profile</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" onClick={handleLogout}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <div className="user-profile">
      <Dropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <Avatar size="default" icon={<UserOutlined />} />
          <div className="user-name">{userName}</div>
          <DownOutlined />
        </a>
      </Dropdown>
    </div>
  );
};

export default UserMenu;
