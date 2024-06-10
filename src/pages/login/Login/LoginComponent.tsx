import React, { useEffect } from 'react';
import { Card, Typography, message } from 'antd';
import GoogleLoginButton from './components/GoogleLoginButton';
import { useRecoilValue } from 'recoil';
import { isUserLoggedIn } from './store/LoginSelector';
import { useNavigate } from 'react-router-dom'; 
import './style.css';
import { User, Error } from './store/LoginTypes';

const { Title } = Typography;

const Login = () => {

  const isAuthenticated = useRecoilValue(isUserLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      console.log('User is authenticated');
      navigate('/homepage');
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSuccess = (user: User) => {
    console.log('Login success', user);
    navigate('/homepage'); 
  };

  const handleLoginFailure = (error: Error) => {
    console.log('Login failure', error);
    message.error("Login failed")
  };

  return (
    <section className="login-container">
      <div className="app-name-container">
        <Title level={2} className="app-name">FINANCE TRACKER</Title>
      </div>
      <div className="login-card-container">
        <Card bordered={false} className="login-card">
          <Title level={4} className="login-title">Login to your account</Title>
          <GoogleLoginButton
            onSuccess={handleLoginSuccess}
            onFailure={handleLoginFailure}
            className="google-login-button"
          />
        </Card>
      </div>
    </section>
  );
};

export default Login;
