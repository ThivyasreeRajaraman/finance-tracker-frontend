import React from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { FcGoogle } from "react-icons/fc";
import './style.css';
import { useGoogleLogin } from '@react-oauth/google';
import { Button } from 'antd'
import { userData } from '../store/LoginAtoms';
import { currentUserType, GoogleLoginButtonProps, GoogleCodeResponse } from '../store/LoginTypes';
import { jwtDecode } from "jwt-decode";
import { HandleErrorResponse } from 'pages/generic/apiUtils/apiErrorHandling';
import { ErrorResponseType } from 'pages/generic/apiUtils/apiTypes';
import { googleCallbackApi } from 'pages/login/Utils/apiRoutes';

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onSuccess, onFailure, className }) => {
  const setUser = useSetRecoilState(userData);

  const login = useGoogleLogin({
    onSuccess: async (codeResponse: GoogleCodeResponse) => {
      console.log("codeResponse", codeResponse);

      try {
        console.log(`${process.env.REACT_APP_BACKEND_URL}${googleCallbackApi}?code=${codeResponse.code}`)
        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}${googleCallbackApi}?code=${codeResponse.code}`);
        const { user, token } = data;

        const name = user.name;
        localStorage.setItem('token', token);
        localStorage.setItem('userName', name);
        localStorage.setItem('currency',user.default_currency)

        const decodedToken: any = jwtDecode(token);
        const userData: currentUserType = {
          user_id: decodedToken.user_id,
          name: user.name,
          email: decodedToken.email,
          isLoggedIn: true,
          currency:user.default_currency
        };
        setUser(userData)

        onSuccess(user);
      } catch (error) {
        console.error('Error logging in with Google:', error);
        if (axios.isAxiosError(error) && error.response) {
          const errorResponse: ErrorResponseType = error.response.data;
          HandleErrorResponse(errorResponse);
        } else {
          console.error('Unexpected error:', error);
          onFailure(error);
        }
      }
    },
    flow: "auth-code",
  });



  return (
    <div className="google-login-button">
      <Button
            className="login-button"
            size="large"
            type="primary"
            block
            ghost
            icon={<FcGoogle size={23} className="google-icon" />}
            onClick={() => login()}
          >
            Sign in with Google
          </Button>
    </div>
  );
};

export default GoogleLoginButton;
