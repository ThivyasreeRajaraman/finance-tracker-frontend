import React from 'react';
import TopTitle from 'pages/home/Home/components/toptitle/TopTitle';
import Sidebar from 'pages/home/Home/components/sidebar/SideBar';
import { Outlet } from 'react-router-dom';
import { Row, Col } from 'antd';
import './style.css'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Layout = () => {

  return (
    <Row className="home-container">
      <TopTitle />
      <Row className="content-wrapper">
        <Col span={6} className="sidebar-container">
          <Sidebar />
        </Col>
        <Col className="main-content">
          <Outlet />
        </Col>
      </Row>
    </Row>
  );
};

export default Layout;
