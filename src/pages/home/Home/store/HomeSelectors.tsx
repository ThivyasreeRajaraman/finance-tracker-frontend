
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
            console.log("visible")
            const response = await apiClient(token).get('api/user/recurringExpense/reminder');
            console.log("resss:", response)
            return response.data;
        } catch (error) {
            console.error('Error fetching reminders data:', error);
            HandleErrorResponse(error);
            return [];
        }
    },
});