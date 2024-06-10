import { selector} from 'recoil';
import apiClient from 'pages/generic/apiUtils/client';
import { DataResponseType } from 'pages/generic/apiUtils/apiTypes';
import { ProfileFormType } from './profileType';
export const fetchUserSelector = selector({
    key: 'fetchUserSelector',
    get: async ({ get }) => {
      try {
        const token = localStorage.getItem('token');
        const api = apiClient(token);
        const response = await api.get<any>('api/user'); 
        console.log('user',response.data.data)
        return response.data.data; 
      } catch (error) {
        console.error('Failed to fetch user:', error);
        return [];
      }}
  });

  export const mapUserDataToFormType = (userData: any): ProfileFormType => ({
    name: userData[0].name,
    email: userData[0].email,
    default_currency: userData[0].default_currency
  });

  export const updateUserProfile = async (
    values: ProfileFormType,
  ): Promise<DataResponseType> => {
    try {
      const token = localStorage.getItem('token');
      const response = await apiClient(token).put<DataResponseType>('api/user', values);
      localStorage.setItem('userName', values.name);
      localStorage.setItem('currency',values.default_currency)
      console.log("ress::",response.data)
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : { success: false, "status code": 500, error: 'Unexpected error occurred' };
    }
  };