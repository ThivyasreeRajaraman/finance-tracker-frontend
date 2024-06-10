import { CreateIncomeOrExpenseFormType, TransactionResponsePayloadType } from "./IncomeExpenseTypes";
import moment from "moment";
import { capitalizeFirstLetter } from "pages/generic/helpers/FormatHelpers";

export const mapIncomeExpenseDataToFormType = (incomeExpenseData: any): CreateIncomeOrExpenseFormType => ({
    category_name: incomeExpenseData.Category.name,
    amount: incomeExpenseData.amount,
    transaction_type: capitalizeFirstLetter(incomeExpenseData.transaction_type)
});