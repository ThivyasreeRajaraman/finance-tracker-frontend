import { atom } from 'recoil';
import { CreateRecurringExpenseFormType,CreateRecurringExpensePayloadType } from './RecurringExpenseTypes';

export interface RecurringExpenseFilters {
  page: string;
  limit?: string;
  search_by?: string;
  search_value?: string;
}

export const formState = atom<CreateRecurringExpenseFormType>({
  key: 'formState',
  default: {
    category_name: '',
    amount: null,
    frequency: '',
    next_expense_date: null,
  }
});

export const RecurringExpenseFiltersAtom = atom<RecurringExpenseFilters>({
  key: 'recurringExpenseFilters',
  default: {
    page: '1',
    limit: '10',
  },
});

export const RecurringExpensesAtom = atom<null>({
    key: 'recurringExpenses',
    default: null,
});

export const expenseIdState = atom<string | null>({
    key: 'expenseIdState',
    default: null, 
});

export const CreateRecurringExpensePayloadAtom = atom<CreateRecurringExpensePayloadType>({
  key: 'recurringExpensesPayload',
  default: {
    category_name: '',
    amount: null,
    frequency: '',
    next_expense_date: ''
  }
});