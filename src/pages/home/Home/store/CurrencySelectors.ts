import { selector,selectorFamily} from 'recoil';
import apiClient from 'pages/generic/apiUtils/client';
export const fetchCurrenciesSelector = selector({
    key: 'fetchCurrenciesSelector',
    get: async () => {
      try {
        const token = localStorage.getItem('token');
        const api = apiClient(token);
        const response = await api.get('api/currencies'); 
        console.log('currency',response.data)
        return response.data.currencies; 
      } catch (error) {
        console.error('Failed to fetch currencies:', error);
        throw error
      }}
  });
  
  export const updateDefaultCurrencySelector = selectorFamily<void, string>({
    key: 'updateDefaultCurrencySelector',
    get: (currency) => async ({ get }) => {
      try {
        const token = localStorage.getItem('token');
        const api = apiClient(token);
        const response = await api.put('api/user', { default_currency: currency });
        if (response.status === 200) {
          console.log('Default currency updated successfully');
          localStorage.setItem('currency',currency)

        } else {
          throw new Error('Failed to update default currency');
        }
      } catch (error) {
        console.error('Failed to update default currency:', error);
        throw error; 
      }
    },
  });
  