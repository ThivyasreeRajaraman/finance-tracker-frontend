import { selector } from 'recoil';
import { CreateIncomeOrExpensePayloadAtom, transactionIdState, TransactionTypeAtom, IncomeOrExpenseResponseAtom } from './IncomeExpenseAtoms';
import apiClient from 'pages/generic/apiUtils/client';
import { DataResponseType } from 'pages/generic/apiUtils/apiTypes';
import { mapIncomeExpenseDataToFormType } from './helpers';
import { HandleErrorResponse } from 'pages/generic/apiUtils/apiErrorHandling';
import { DataResponseForExistingEntry } from 'pages/generic/apiUtils/apiTypes';
import { IncomeExpenseFiltersAtom } from './IncomeExpenseAtoms';
import { message } from 'antd';

export const incomeExpenseDataSelector = selector({
    key: 'incomeExpenseData',
    get: async ({ get }) => {
        const transactionId = get(transactionIdState);
        if (!transactionId) return null;

        try {
            const token = localStorage.getItem('token');
            const response = await apiClient(token).get<DataResponseType>(`api/user/transaction/${transactionId}`);
            const incomeExpenseData = response.data.transaction;
            console.log("1111", response.data.transaction)
            return mapIncomeExpenseDataToFormType(incomeExpenseData);
        } catch (error) {
            console.error('Error fetching  transaction:', error);
            HandleErrorResponse(error);
            return null;
        }
    },
});

export const createOrUpdateIncomeOrExpense = selector({
    key: 'createOrUpdateIncomeOrExpense',
    get: async ({ get }) => {
        try {
            const incomeOrExpensePayload = get(CreateIncomeOrExpensePayloadAtom);
            if (incomeOrExpensePayload.amount != null) {
                console.log("payloaddd:::", incomeOrExpensePayload)
                console.log("not undef")
                const transactionId = get(transactionIdState);
                const token = localStorage.getItem('token');
                let response
                console.log("recPayload::", incomeOrExpensePayload)
                if (incomeOrExpensePayload.category_name !== '') {
                    if (transactionId) {
                        response = await apiClient(token).put<DataResponseForExistingEntry>(`api/user/transaction/${transactionId}`, incomeOrExpensePayload);
                        console.log("Response data1:", response.data);
                        if (response.data.success) {
                            message.success(response?.data.message);
                            localStorage.setItem('response', "true")
                        }

                    } else {
                        response = await apiClient(token).post<DataResponseType>('api/user/transaction', incomeOrExpensePayload);
                        console.log("Response data2:", response.data);
                        if (response.data.success) {
                            message.success(response?.data.message);
                            localStorage.setItem('response', "true")
                        }
                    }
                    console.log("response.data::", response.data)
                    if (response.data.alert) {
                        message.warning(response.data.alert);
                    }
                    return response.data
                }
            }

        } catch (error: any) {
            console.error("Error:", error);
            HandleErrorResponse(error);
        }
    },
});

export const getIncomeOrExpenses = selector<{
    data: any[];
    page: number;
    limit: number;
    totalPages: number;
    totalCount: number;
}>({
    key: 'getIncomeOrExpenses',
    get: async ({ get }) => {
        const token = localStorage.getItem('token');
        const api = apiClient(token);
        const transactionTypeState = get(TransactionTypeAtom)
        console.log("typeeee::", transactionTypeState.transactionType)
        const filters = get(IncomeExpenseFiltersAtom);
        if (transactionTypeState.transactionType != '') {
            const response = await api.get(`api/user/transactions/${transactionTypeState.transactionType.toLowerCase()}`, {
                params: {
                    pageNumber: filters.page,
                    perPageCount: filters.limit || 10,
                },
            });
            console.log("respdataa::", response.data)

            const selectedData = response.data.data.map((item: any) => ({
                id: item.ID,
                createdAt: item.CreatedAt,
                category: item.Category?.name,
                amount: item.amount,
                currency: item.currency,
            }));
            return {
                data: selectedData,
                page: response.data.page,
                limit: response.data.limit,
                totalPages: response.data.totalPages,
                totalCount: response.data.totalCount,
            };
        } else {
            return {
                data: [],
                page: filters.page,
                limit: filters.limit || 10,
                totalPages: 0,
                totalCount: 0,
            };
        }

    },
});

export const fetchIncomeorExpenseCategoriesSelector = selector({
    key: 'fetchIncomeExpenseCategoriesSelector',
    get: async ({ get }) => {
        try {
            const transactionType = get(TransactionTypeAtom).transactionType.toLowerCase()
            if (transactionType) {
                console.log("typeeee::", transactionType)
                const token = localStorage.getItem('token');
                const api = apiClient(token);
                const response = await api.get(`api/categories/${transactionType}`);
                console.log(response)
                return response.data.data;
            }
            console.log("err:transaction tyepo:", transactionType)
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    },
});