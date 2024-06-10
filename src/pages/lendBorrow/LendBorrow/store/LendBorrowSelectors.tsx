import { selector, atom } from 'recoil';
import apiClient from '../../../generic/apiUtils/client';
import { LendBorrowFiltersAtom,CreateLendBorrowPayloadAtom,transactionIdState } from './LendBorrowAtoms';
import { DataResponseType, ErrorResponseType,DataResponseForExistingEntry } from '../../../generic/apiUtils/apiTypes';
import { HandleErrorResponse } from 'pages/generic/apiUtils/apiErrorHandling';
import { mapLendBorrowDataToFormType } from './helpers';

import axios from 'axios';

export const getLendBorrow = selector<{
  data: any[];
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
}>({
  key: 'GET_LEND_BORROW',
  get: async ({ get }) => {
    console.log("lend::")
    const token = localStorage.getItem('token');
    const api = apiClient(token);

    const filters = get(LendBorrowFiltersAtom);
    const response = await api.get('api/user/transactionpartner', {
      params: {
        pageNumber: filters.page,
        perPageCount: filters.limit || 10,
      },
      
    });
    console.log("lend::",response)
    const selectedData = response.data.data.filter((item: any) => item.closing_balance !== 0).map((item: any) => ({
      id: item.ID,
      createdAt: item.CreatedAt,
      transactionPartner: item.partner_name,
      amount: Math.abs(item.closing_balance),
      paymentDueDate: item.due_date,
      transactionType:item.closing_balance < 0 ? "Lend" : "Borrow",
    }));
    console.log("selcteddata::", selectedData)
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

export const fetchPartnersSelector = selector({
  key: 'FETCH_PARTNERS_SELECTOR',
  get: async () => {
    try {
      const token = localStorage.getItem('token');
      const api = apiClient(token);
      const response = await api.get('api/user/transactionpartner');
      const partnerNames = response.data.data.map((item: any) => item.partner_name);
      console.log(partnerNames)
      return partnerNames;
    } catch (error) {
      console.error('Error fetching partners:', error);
      throw error;
    }
  },
});

export const createLendBorrowState = atom<any>({
  key: 'CREATE_LEND_BORROW_STATE',
  default: {},
});

export const createOrUpdateLendBorrow = selector({
  key: 'CREATE_UPDATE_LEND_BORROW',
  get: async ({ get }) => {
    try {
      const lendBorrowPayload = get(CreateLendBorrowPayloadAtom);
      const transactionId = get(transactionIdState);
      const token = localStorage.getItem('token');
      let response
      console.log("transPayload::",lendBorrowPayload)
      if (lendBorrowPayload.transaction_partner!='') {
        if (transactionId) {
          response = await apiClient(token).put<DataResponseForExistingEntry>(`api/user/transaction/${transactionId}`, lendBorrowPayload);
          console.log("Response data1:", response.data);
        } else {
          response = await apiClient(token).post<DataResponseType>('api/user/transaction', lendBorrowPayload);
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



export const lendBorrowDataSelector = selector({
  key: 'LEND_BORROW_DATA',
  get: async ({ get }) => {
    const transactionId = get(transactionIdState);
    if (!transactionId) return null;

    try {
      const token = localStorage.getItem('token');
      const response = await apiClient(token).get<DataResponseType>(`api/user/transaction/${transactionId}`);
      const lendBorrowData = response.data;
      console.log("fetch::", lendBorrowData);
      console.log("valll:::", mapLendBorrowDataToFormType(lendBorrowData));
      return mapLendBorrowDataToFormType(lendBorrowData);
    } catch (error) {
      console.error('Error fetching transaction data:', error);
      HandleErrorResponse(error);
      return null;
    }
  },
});



