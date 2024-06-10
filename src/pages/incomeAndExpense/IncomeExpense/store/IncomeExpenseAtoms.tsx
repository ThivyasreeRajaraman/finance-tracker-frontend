import { atom } from 'recoil';
import { IncomeOrExpenseFilters, CreateIncomeOrExpenseFormType, TransactionResponsePayloadType, TransactionType } from './IncomeExpenseTypes';

export const IncomeExpenseFormState = atom<CreateIncomeOrExpenseFormType>({
  key: 'incomeExpenseFormState',
  default: {
    transaction_type: undefined,
    category_name: undefined,
    amount: null,
  }
});

export const IncomeExpenseFiltersAtom = atom<IncomeOrExpenseFilters>({
  key: 'incomeOrExpenseFilters',
  default: {
    page: '1',
    limit: '10',
  },
});

export const transactionIdState = atom<string | null>({
    key: 'transactionIdState',
    default: null, 
});

export const CreateIncomeOrExpensePayloadAtom = atom<CreateIncomeOrExpenseFormType>({
    key: 'incomeOrExpensesPayload',
    default: {
      category_name: undefined,
      amount: null,
      transaction_type: undefined,
    }
});

export const incomeExpenseFormState = atom<CreateIncomeOrExpenseFormType>({
    key: 'incomeOrExpensesFormState',
    default: {
      category_name: undefined,
      amount: null,
      transaction_type: undefined,
    }
})
  
export const IncomeOrExpenseListAtom = atom<TransactionResponsePayloadType[]>({
    key: 'incomeOrExpensesList',
    default: []
})

export const TransactionTypeAtom = atom<TransactionType>({
    key: 'transactionType',
    default: {
        transactionType: ''
      }
})

export const IncomeOrExpenseResponseAtom = atom({
    key: 'IncomeOrExpenseResponseAtom',
    default: null,
});