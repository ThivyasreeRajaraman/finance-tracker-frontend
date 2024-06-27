import { selector } from 'recoil';
import apiClient from '../../../generic/apiUtils/client';
import { HandleErrorResponse } from 'pages/generic/apiUtils/apiErrorHandling';
import { RecurringExpensesAtom } from 'pages/recurringExpense/RecurringExpense/store/RecurringExpenseAtoms';
import { ChartFilterParamsAtom, modalVisibleState, NotificationAtom } from './HomeAtoms';


export const transactionTotalSelector = selector({
    key: 'transactionTotalSelector',
    get: async ({get}) => {
        try {
            const chartFiltersAtom = get(ChartFilterParamsAtom)
            console.log("came insideee")
            const token = localStorage.getItem('token');
            const api = apiClient(token);
            const response = await api.get(`api/user/transactionTotal?month=${chartFiltersAtom.month}&year=${chartFiltersAtom.year}`);
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
            const modalVisible = get(modalVisibleState);
            const recurringExpensesState = get(RecurringExpensesAtom);
            const notificationData = get(NotificationAtom);
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
        const chartFiltersAtom = get(ChartFilterParamsAtom)
        const token = localStorage.getItem('token');
        const response = await apiClient(token).get(`api/user/categoryWiseTotal?month=${chartFiltersAtom.month}&year=${chartFiltersAtom.year}`);
        console.log("transactionCategWise::",response.data)
        return response.data.transaction_total_by_category 
      } catch (error) {
        console.error('Error fetching category-wise total data:', error);
        HandleErrorResponse(error);
        return {};
      }
    },
  });