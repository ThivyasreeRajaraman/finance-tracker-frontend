import { Route, Routes } from 'react-router-dom';
import CreateExpense from '../IncomeExpense/CreateExpense';
import CreateIncome from '../IncomeExpense/CreateIncome';
import EditExpense from '../IncomeExpense/EditExpense';
import EditIncome from '../IncomeExpense/EditIncome';
import IncomeListPage from '../IncomeExpense/IncomeList';
import ExpenseListPage from '../IncomeExpense/ExpenseList';

export function IncomeRoutes() {
  return (
    <Routes>
      <Route index element={<IncomeListPage />} />
      <Route path="create" element={<CreateIncome />} />
      <Route path=":transactionId/edit" element={<EditIncome />} />
    </Routes>
  );
}


export function ExpenseRoutes() {
    return (
      <Routes>
        <Route index element={<ExpenseListPage />} />
        <Route path="create" element={<CreateExpense />} />
        <Route path=":transactionId/edit" element={<EditExpense />} />
      </Routes>
    );
  }
