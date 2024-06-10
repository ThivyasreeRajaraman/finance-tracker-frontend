import { atom } from 'recoil';
import { CreateRecurringExpenseFormType, CreateRecurringExpensePayloadType, RecurringExpense, CategoriesResponse } from './RecurringExpenseTypes';

export interface RecurringExpenseFilters {
  page: string;
  limit?: string;
  search_by?: string;
  search_value?: string;
}

export const formState = atom<CreateRecurringExpenseFormType>({
  key: 'formState',
  default: {
    category_name: undefined,
    amount: null,
    frequency: undefined,
    next_expense_date: null,
    currency:'INR'
  }
});

export const RecurringExpenseFiltersAtom = atom<RecurringExpenseFilters>({
  key: 'recurringExpenseFilters',
  default: {
    page: '1',
    limit: '10',
  },
});

export const RecurringExpensesAtom = atom<RecurringExpense[]>({
    key: 'recurringExpenses',
    default: [],
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
    next_expense_date: '',
    currency:'INR',
  }
});
