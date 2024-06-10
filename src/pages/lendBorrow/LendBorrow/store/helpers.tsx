import { CreateLendBorrowFormType } from "./LendBorrowTypes";
import moment from "moment";

export const mapLendBorrowDataToFormType = (LendBorrowData: any): CreateLendBorrowFormType => ({
    transaction_partner: LendBorrowData.lendBorrow.transaction_partner,
    amount: LendBorrowData.lendBorrow.amount,
    transaction_type: LendBorrowData.lendBorrow.transaction_type,
    payment_due_date: LendBorrowData.lendBorrow.payment_due_date ? LendBorrowData.lendBorrow.payment_due_date : null,
  
  });

export const convertLendBorrowDataToFormType = (LendBorrowData: any): CreateLendBorrowFormType => ({
  transaction_partner: LendBorrowData.transaction_partner,
  amount: LendBorrowData.amount,
  transaction_type: LendBorrowData.transaction_type,
  payment_due_date: LendBorrowData.payment_due_date ? moment(LendBorrowData.payment_due_date) : null,
});