import { atom } from 'recoil';
import { CreateRecurringExpenseFormType, CreateRecurringExpensePayloadType, RecurringExpense, CategoriesResponse } from './RecurringExpenseTypes';

export interface RecurringExpenseFilters {
  page: string;
  limit?: string;
  search_by?: string;
  search_value?: string;
}

export const formState = atom<CreateRecurringExpenseFormType>({
  key: 'recurringExpenseFormState',
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

const defaultRecurringExpense: RecurringExpense = {
  id: 0,
  userId: 0,
  categoryId: 0,
  category: '',
  amount: 0,
  frequency: '',
  nextExpenseDate: '',
  createdAt: '',
  updatedAt: '',
  active: true,
  currency: ''
};

export const RecurringExpensesAtom = atom<RecurringExpense[]>({
    key: 'recurringExpenses',
    default: [defaultRecurringExpense],
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
