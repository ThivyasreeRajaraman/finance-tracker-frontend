import { selector, atom } from 'recoil';
import apiClient from '../../../generic/apiUtils/client';
import { LendBorrowFiltersAtom,CreateLendBorrowPayloadAtom,transactionIdState } from './LendBorrowAtoms';
import { DataResponseType,DataResponseForExistingEntry } from '../../../generic/apiUtils/apiTypes';
import { HandleErrorResponse } from 'pages/generic/apiUtils/apiErrorHandling';


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
    const response = await api.get(`api/user/transactionpartner/${filters.filter}`, {
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
      console.log("partners:",response.data.partners)
      return response.data.partners;
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

export const createLendBorrow = selector({
  key: 'CREATE_LEND_BORROW',
  get: async ({ get }) => {
    try {
      const lendBorrowPayload = get(CreateLendBorrowPayloadAtom);
      const token = localStorage.getItem('token');
      console.log("transPayload::",lendBorrowPayload)
      if (lendBorrowPayload.transaction_partner!='') {       
        const response = await apiClient(token).post<DataResponseType>('api/user/transaction', lendBorrowPayload);        
        console.log("response.data::",response.data)
        return response.data
      }

    } catch (error: any) {
      console.error("Error:", error);
      HandleErrorResponse(error);
    }
  },
});


