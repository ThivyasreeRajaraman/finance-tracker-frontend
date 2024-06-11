import { atom } from 'recoil';
import { CreateLendBorrowFormType,CreateLendBorrowPayloadType } from './LendBorrowTypes';

export interface LendBorrowFilters {
  page: string;
  limit?: string;
}

export const formState = atom<CreateLendBorrowFormType>({
  key: 'lendOrBorrowFormState',
  default: {
    transaction_partner: '',
    amount: null,
    transaction_type: '',
    payment_due_date: null,
  }
});

export const LendBorrowFiltersAtom = atom<LendBorrowFilters>({
  key: 'LEND_BORROW_FILTERS',
  default: {
    page: '1',
    limit: '10',
  },
});

export const LendBorrowAtom = atom<null>({
    key: 'LENDBORROW',
    default: null,
});

export const transactionIdState = atom<string | null>({
    key: 'TRANSACTION_ID_STATE',
    default: null, 
});

export const CreateLendBorrowPayloadAtom = atom<CreateLendBorrowPayloadType>({
  key: 'LEND_BORROW_PAYLOAD',
  default: {
    transaction_partner: '',
    amount: null,
    transaction_type: '',
    payment_due_date: ''
  }
});