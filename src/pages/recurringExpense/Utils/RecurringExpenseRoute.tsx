import { Route, Routes } from 'react-router-dom';
import RecurringExpenseListPage from '../RecurringExpense/RecurringExpenseList';
import CreateRecurringExpensePage from '../RecurringExpense/CreateRecurringExpense';
import EditRecurringExpensePage from '../RecurringExpense/EditRecurringExpense';
function RecurringExpenseRoutes() {
  return (
    <Routes>
      <Route index element={<RecurringExpenseListPage />} />
      <Route path="create" element={<CreateRecurringExpensePage />} />
      <Route path=":expenseId/edit" element={<EditRecurringExpensePage />} />
    </Routes>
  );
}

export default RecurringExpenseRoutes;
