import { Moment } from "moment";
import { DataResponseType } from "pages/generic/apiUtils/apiTypes";

export type CreateRecurringExpenseFormType = {
    category_name?: string;
    amount: number | null;
    frequency?: string;
    next_expense_date: null | Moment;
    currency: string;
};

export type CreateRecurringExpensePayloadType = {
    category_name?: string;
    amount: number | null;
    frequency?: string;
    next_expense_date: string | undefined;
    currency: string;
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
    active: boolean;
    currency: string;
  }

  export interface CategoriesResponse extends DataResponseType {
    data: string[];
  }
  
  export const defaultCategoriesResponse: CategoriesResponse = {
    success: false,
    message: "",
    data: [],
  };