import { CreateRecurringExpenseFormType } from "./RecurringExpenseTypes";
import moment from "moment";

export const mapExpenseDataToFormType = (expenseData: any): CreateRecurringExpenseFormType => ({
    category_name: expenseData.expense.category,
    amount: expenseData.expense.amount,
    frequency: expenseData.expense.frequency,
    next_expense_date: expenseData.expense.next_expense_date ? expenseData.expense.next_expense_date : null,
  
  });

export const convertExpenseDataToFormType = (expenseData: any): CreateRecurringExpenseFormType => ({
  category_name: expenseData.category_name,
  amount: expenseData.amount,
  frequency: expenseData.frequency,
  next_expense_date: expenseData.next_expense_date ? moment(expenseData.next_expense_date) : null,

});