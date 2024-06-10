import { Moment } from "moment";

export type CreateRecurringExpenseProps = {
    expenseId?: string;
}

export type CreateRecurringExpenseFormType = {
    category_name: string;
    amount: number | null;
    frequency: string;
    next_expense_date: null | Moment;
};

export type CreateRecurringExpensePayloadType = {
    category_name?: string;
    amount: number | null;
    frequency?: string;
    next_expense_date: string | undefined;
};

export interface RecurringExpense {
    id: number;
    userId: number;
    categoryId: number;
    category: string;
    amount: number;
    frequency: string;
    nextExpenseDate: string;
    createdAt: string;
    updatedAt: string;
  }
  
