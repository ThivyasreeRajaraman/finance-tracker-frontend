
import { selector } from 'recoil';
import apiClient from '../../../generic/apiUtils/client';
import { HandleErrorResponse } from 'pages/generic/apiUtils/apiErrorHandling';

export const transactionTotalSelector = selector({
    key: 'transactionTotalSelector',
    get: async () => {
        try {
            console.log("came insideee")
            const token = localStorage.getItem('token');
            const api = apiClient(token);
            const response = await api.get(`api/user/transactionTotal`);
            console.log("totalllll:", response)
            return response.data.transaction_total;
        } catch (error) {
            console.error('Error fetching transaction total:', error);
            throw error;
        }
    },
});

export const remindersDataSelector = selector({
    key: 'remindersData',
    get: async ({ get }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await apiClient(token).get('api/user/recurringExpense/reminder');
            return response.data;
        } catch (error) {
            console.error('Error fetching reminders data:', error);
            HandleErrorResponse(error);
            return [];
        }
    },
});

export const categoryWiseTotalSelector = selector({
    key: 'categoryWiseTotal',
    get: async ({ get }) => {
      try {
        const token = localStorage.getItem('token');
        const response = await apiClient(token).get('api/user/categoryWiseTotal');
        console.log("transactionCategWise::",response.data)
        return response.data.transaction_total_by_category 
      } catch (error) {
        console.error('Error fetching category-wise total data:', error);
        HandleErrorResponse(error);
        return {};
      }
    },
  });