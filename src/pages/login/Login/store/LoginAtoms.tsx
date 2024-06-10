import { atom } from 'recoil';
import { currentUserType } from './LoginTypes';
import { jwtDecode } from 'jwt-decode';

export const userData = atom<currentUserType | null>({
  key: 'userData',
  default: null,
  effects_UNSTABLE: [
    ({ setSelf }) => {
      const userName = localStorage.getItem('userName');
      const savedValue = localStorage.getItem('token');
      if (savedValue != null && userName != null) {
        const decodedValue: currentUserType = {
          ...jwtDecode(savedValue),
          name: userName,
          isLoggedIn: true,
        };
        setSelf(decodedValue);
      }
    },
    ({ onSet }) => {
      onSet((newValue, _, isReset) => {
        if (isReset) {
          localStorage.removeItem('token');
          localStorage.removeItem('userName');
        }
      });
    },
  ],
});
