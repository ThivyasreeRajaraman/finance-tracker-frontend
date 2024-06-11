import { selector, atom, useRecoilValue, useRecoilState } from 'recoil';
import apiClient from '../../../generic/apiUtils/client';
import { RecurringExpenseFiltersAtom } from './RecurringExpenseAtoms';
import { DataResponseType, DataResponseForExistingEntry } from '../../../generic/apiUtils/apiTypes';
import { HandleErrorResponse } from 'pages/generic/apiUtils/apiErrorHandling';
import { expenseIdState, formState } from './RecurringExpenseAtoms';
import { mapExpenseDataToFormType } from './helpers';
import { CreateRecurringExpensePayloadAtom } from './RecurringExpenseAtoms';
import { modalVisibleState, NotificationAtom } from 'pages/home/Home/store/HomeAtoms';

export const getRecurringExpenses = selector<{
  data: any[];
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
}>({
  key: 'getRecurringExpenses',
  get: async ({ get }) => {
    const token = localStorage.getItem('token');
    const api = apiClient(token);
    const modalVisible = get(modalVisibleState)
    const filters = get(RecurringExpenseFiltersAtom);
    const notificationData = get(NotificationAtom);
    const response = await api.get('api/user/recurringExpense', {
      params: {
        pageNumber: filters.page,
        perPageCount: filters.limit || 10,
      },
    });

    const selectedData = response.data.data.map((item: any) => ({
      id: item.ID,
      createdAt: item.CreatedAt,
      category: item.Category?.name,
      amount: item.amount,
      nextExpenseDate: item.next_expense_date,
      active: item.active,
      currency: item.currency
    }));
    console.log("data::", selectedData)
    console.log("data::", response.data)
    return {
      data: selectedData,
      page: response.data.page,
      limit: response.data.limit,
      totalPages: response.data.totalPages,
      totalCount: response.data.totalCount,
    };
  },
});

export const fetchRecurringExpenseCategoriesSelector = selector({
  key: 'fetchRecurringExpenseCategoriesSelector',
  get: async () => {
    try {
      const token = localStorage.getItem('token');
      const api = apiClient(token);
      const response = await api.get('api/categories/recurringExpense');
      console.log("rec categ:",response)
      return response.data.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },
});

export const createRecurringExpenseState = atom<any>({
  key: 'createRecurringExpenseState',
  default: {},
});

export const createOrUpdateRecurringExpense = selector({
  key: 'createOrUpdateRecurringExpense',
  get: async ({ get }) => {
    try {
      const recurringExpensePayload = get(CreateRecurringExpensePayloadAtom);
      const expenseId = get(expenseIdState);
      const token = localStorage.getItem('token');
      let response
      console.log("recPayload::",recurringExpensePayload)
      if (recurringExpensePayload.category_name!='') {
        if (expenseId) {
          response = await apiClient(token).put<DataResponseForExistingEntry>(`api/user/recurringExpense/${expenseId}`, recurringExpensePayload);
          console.log("Response data1:", response.data);
        } else {
          response = await apiClient(token).post<DataResponseType>('api/user/recurringExpense', recurringExpensePayload);
          console.log("Response data2:", response.data);
        }
        console.log("response.data::",response.data)
        return response.data
      }

    } catch (error: any) {
      console.error("Error:", error);
      HandleErrorResponse(error);
    }
  },
});

export const expenseDataSelector = selector({
  key: 'expenseData',
  get: async ({ get }) => {
    const expenseId = get(expenseIdState);
    if (!expenseId) return null;

    try {
      const token = localStorage.getItem('token');
      const response = await apiClient(token).get<DataResponseType>(`api/user/recurringExpense/${expenseId}`);
      const expenseData = response.data;
      return mapExpenseDataToFormType(expenseData);
    } catch (error) {
      console.error('Error fetching expense data:', error);
      HandleErrorResponse(error);
      return null;
    }
  },
});