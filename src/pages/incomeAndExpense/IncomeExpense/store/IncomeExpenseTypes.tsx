import { Moment } from "moment";
import { DataResponseType } from "pages/generic/apiUtils/apiTypes";

export interface CreateIncomeOrExpenseProps {
    transactionType: string;
}

export type CreateIncomeOrExpenseFormType = {
    transaction_type: string | undefined;
    category_name?: string;
    amount: number | null;
};

export interface IncomeOrExpenseFilters {
    page: string;
    limit?: string;
}

export type TransactionResponsePayloadType = {
    id: number;
    createdAt: string | null;
    transaction_type: string;
    category_name: string | undefined;
    amount: number | null;
    transaction_partner: string | undefined;
    payment_due_date: string | undefined
}

export type TransactionType = {
    transactionType: string;
}