import { atom } from 'recoil';
import { CreateBudgetFormType,CreateBudgetPayloadType } from './BudgetTypes';

export interface BudgetFilters {
  page: string;
  limit?: string;
}

export const formState = atom<CreateBudgetFormType>({
  key: 'formState',
  default: {
    budgets: [
      {
        category_name: undefined,
        amount: null,
        threshold: null,
        currency:localStorage.getItem('currency') || '',
      }
    ]
  }
});

export const BudgetFiltersAtom = atom<BudgetFilters>({
  key: 'BUDGET_FILTERS',
  default: {
    page: '1',
    limit: '10',
  },
});

export const BudgetAtom = atom<null>({
    key: 'BUDGETS',
    default: null,
});

export const budgetIdState = atom<string | null>({
    key: 'budgetIdState',
    default: null, 
});

export const CreateBudgetPayloadAtom = atom<CreateBudgetPayloadType>({
  key: 'recurringExpensesPayload',
  default: {
    budgets: [
      {
        category_name: '',
        amount: null,
        threshold: null,
        currency:localStorage.getItem('currency') || '',
      }
    ]
  }
});