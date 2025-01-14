import { Moment } from "moment";

export type CreateLendBorrowProps = {
    transactionId?: string;
}

export type CreateLendBorrowFormType = {
    transaction_partner?: string;
    amount: number | null;
    transaction_type?: string;
    payment_due_date: null | Moment;
    currency:string;
};

export type CreateLendBorrowPayloadType = {
    transaction_partner?: string;
    amount: number | null;
    transaction_type?: string;
    payment_due_date: string | undefined;
    currency: string,
};

export interface LendBorrow {
    id: number;
    userId: number;
    transactionPartnerId: number;
    transactionPartner: string;
    amount: number;
    transactionType: string;
    paymentDueDate: string;
    createdAt: string;
    updatedAt: string;
    currency: string;
  }
  
