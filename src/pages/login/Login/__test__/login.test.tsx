// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
// import { useNavigate } from 'react-router-dom';
// import { useGoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from 'jwt-decode';
// import Login from '../LoginComponent';
// import { googleCallbackApi } from 'pages/login/Utils/apiRoutes';


// jest.clearAllMocks();

// jest.mock('recoil', () => ({
//   ...jest.requireActual('recoil'),
//   useRecoilValue: jest.fn(),
//   useSetRecoilState: jest.fn(),
// }));

// jest.mock('react-router-dom', () => ({
//   useNavigate: jest.fn(),
// }));

// jest.mock('@react-oauth/google', () => ({
//   useGoogleLogin: jest.fn(),
// }));

// jest.mock('jwt-decode', () => ({
//   jwtDecode: jest.fn(),
// }));

// jest.mock('../store/apiHelpers', () => ({
//   googleCallback: jest.fn(),
// }));



// describe('Login Component', () => {
//   const setUser = jest.fn();
//   const navigate = jest.fn();
//   jest.spyOn(localStorage, 'setItem');
  
//   beforeEach(() => {
//     (useNavigate as jest.Mock).mockReturnValue(navigate);
//   });

//   it('should render the login component and handle login', () => {
//     render(
//       <RecoilRoot>
//         <Login />
//       </RecoilRoot>
//     );

//     expect(screen.getByText('Sign in with Google')).toBeInTheDocument();

//     fireEvent.click(screen.getByText('Sign in with Google'));
//     expect(useGoogleLogin).toHaveBeenCalled();
//   });

//   it('should navigate to feed if already logged in', () => {
//     (useRecoilValue as jest.Mock).mockReturnValue(true);

//     render(
//       <RecoilRoot>
//         <Login />
//       </RecoilRoot>
//     );

//     expect(navigate).toHaveBeenCalledWith('/feed');
//   });

//   it('should handle successful Google login', async () => {
//     const mockToken = 'mockToken';
//     const mockUser = {     
//       name: "string",
//       email: "string",
//       user_id: 1,
//       exp: 2,
//       iss: "string"
//     };
    
//     (useGoogleLogin as jest.Mock).mockImplementation((options) => {
//       return () => {
//         options.onSuccess({ code: 'mockCode' });
//       };
//     });
//     (googleCallbackApi as jest.Mock).mockResolvedValue(mockToken);
//     (jwtDecode as jest.Mock).mockReturnValue(mockUser);
//     (useSetRecoilState as jest.Mock).mockReturnValue(setUser);

//     render(
//       <RecoilRoot>
//         <Login />
//       </RecoilRoot>
//     );

//     await waitFor(() => {
//       fireEvent.click(screen.getByText('Sign in with Google'));
//     });
//     expect(localStorage.getItem("jwtToken")).toEqual(mockToken);
//     expect(setUser).toHaveBeenCalledWith(mockUser);
//     expect(navigate).toHaveBeenCalledWith('/feed');
//   });

//   it('should handle Google login error', async () => {
//     console.error = jest.fn();
//     const error = new Error("Google login failed");
    
//     (googleCallbackApi as jest.Mock).mockRejectedValue(error);
    
//     let onSuccessCallback :any;
//     (useGoogleLogin as jest.Mock).mockImplementation(({ onSuccess }) => {
//       onSuccessCallback = onSuccess;
//     });

//     render(<RecoilRoot>
//       <Login />
//     </RecoilRoot>);

//     const loginButton = screen.getByText("Sign in with Google");
//     fireEvent.click(loginButton);

//     await waitFor(() => {
//       expect(onSuccessCallback).toBeDefined();
//     });

//     await onSuccessCallback({ code: "test-code" });

//     await waitFor(() => {
//       expect(console.error).toHaveBeenCalledWith(
//         "Error during Google callback:",
//         error.message
//       );
//     });
//   });
// });