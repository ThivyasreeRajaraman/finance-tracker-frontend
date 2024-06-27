import { selector } from 'recoil';
import apiClient from 'pages/generic/apiUtils/client';
import { DataResponseType } from 'pages/generic/apiUtils/apiTypes';
import { ProfileFormType } from './profileType';
import { EditUserProfileAtom, UserProfileAtom } from './ProfileAtoms';

export const fetchUserSelector = selector({
  key: 'fetchUserSelector',
  get: async ({ get }) => {
    try {
      // const name = get(UserProfileAtom);
      const token = localStorage.getItem('token');
      const api = apiClient(token);
      const response = await api.get<any>('api/user');
      console.log('user', response.data.data)
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      return [];
    }
  }
});

export const mapUserDataToFormType = (userData: any): ProfileFormType => ({
  name: userData[0].name,
  email: userData[0].email,
  default_currency: userData[0].default_currency
});

export const updateUserProfile = selector({
  key: 'updateUserSelector',
  get: async ({ get }) => {
    try {
      const nameState = get(EditUserProfileAtom);
      console.log("udpt name;:",nameState.name)
      if (nameState.name != undefined) {
        const token = localStorage.getItem('token');
        const response = await apiClient(token).put<DataResponseType>('api/user', { name: nameState.name });
        
        console.log("ress::", response.data.user)
        localStorage.setItem('userName', response.data.user.name);
        localStorage.setItem('currency',response.data.user.default_currency)
        return response.data.user;
      }

    } catch (error) {
      console.error('Failed to fetch user:', error);
      return [];
    }
  }
});