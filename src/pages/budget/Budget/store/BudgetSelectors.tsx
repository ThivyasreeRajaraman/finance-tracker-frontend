import { selector, atom } from 'recoil';
import apiClient from '../../../generic/apiUtils/client';
import { BudgetFiltersAtom, CreateBudgetPayloadAtom } from './BudgetAtoms';
import { DataResponseType, ErrorResponseType } from '../../../generic/apiUtils/apiTypes';
import { HandleErrorResponse } from 'pages/generic/apiUtils/apiErrorHandling';
import { budgetIdState } from './BudgetAtoms';
import { mapBudgetDataToFormType } from './helpers';

import axios from 'axios';

export const getBudgets = selector<{
  data: any[];
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
}>({
  key: 'GET_BUDGETS',
  get: async ({ get }) => {
    const token = localStorage.getItem('token');
    const api = apiClient(token);

    const filters = get(BudgetFiltersAtom);
    const response = await api.get('api/user/budget', {
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
      threshold: item.threshold,
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

export const fetchCategoriesSelector = selector({
  key: 'fetchCategoriesSelector',
  get: async () => {
    try {
      const token = localStorage.getItem('token');
      const api = apiClient(token);
      const response = await api.get('api/categories/budget');
      console.log(response)
      return response.data.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },
});

export const createBudgetState = atom<any>({
  key: 'CREATE_BUDGET_STATE',
  default: {},
});

export const createBudgetSelector = selector({
  key: 'CREATE_BUDGET_SELECTOR',
  get: () => {
    return;
  },
  set: ({ set }, formData) => {
    const token = localStorage.getItem('token');
    const api = apiClient(token);

    return api.post('api/user/budget', formData)
      .then(response => {
        console.log('Response:', response.data);
        return response.data;
      })
      .catch(error => {
        if (axios.isAxiosError(error) && error.response) {
          const errorResponse: ErrorResponseType = error.response.data;
          set(createBudgetState, { error: errorResponse.error });
          throw errorResponse;
        } else {
          console.error('Unexpected error:', error);
          throw error;
        }
      });
  },
});

export const createOrUpdateBudget = selector({
    key: 'CREATE_OR_UPDATE_BUDGET',
    get: async ({ get }) => {
        try {
            const budgetPayload = get(CreateBudgetPayloadAtom);
            const budgetId = get(budgetIdState);
            const token = localStorage.getItem('token');
            console.log("request data:",budgetPayload)
            let response;
            if (budgetPayload.budgets[0].category_name!='') {
                if (budgetId) {
                    response = await apiClient(token).put<DataResponseType>(`api/user/budget/${budgetId}`, budgetPayload.budgets[0]);
                } else {
                    
                    response = await apiClient(token).post<DataResponseType>('api/user/budget', budgetPayload.budgets);
                }
                console.log("ress1::", response.data, response)
                return response.data;
            }
        } catch (error: any) {
            console.error("Error:", error);
            HandleErrorResponse(error);
        }
    },

});



export const budgetDataSelector = selector({
  key: 'BUDGET_DATA',
  get: async ({ get }) => {
    const budgetId = get(budgetIdState);
    if (!budgetId) return null;

    try {
      const token = localStorage.getItem('token');
      const response = await apiClient(token).get<DataResponseType>(`api/user/budget/${budgetId}`);
      const budgetData = response.data;
      console.log("fetch::", budgetData);
      console.log("valll:::", mapBudgetDataToFormType(budgetData.budget));
      return mapBudgetDataToFormType(budgetData.budget);
    } catch (error) {
      console.error('Error fetching budget data:', error);
      HandleErrorResponse(error);
      return null;
    }
  },
});



