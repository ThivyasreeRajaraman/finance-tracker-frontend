import { Route, Routes } from 'react-router-dom';
import BudgetListPage from '../Budget/BudgetList';
import CreateBudgetPage from '../Budget/CreateBudget';
import EditBudgetPage from '../Budget/EditBudget';
function BudgetRoutes() {
  return (
    <Routes>
      <Route index element={<BudgetListPage />} />
      <Route path="create" element={<CreateBudgetPage />} />
      <Route path=":budgetId/edit" element={<EditBudgetPage />} />
    </Routes>
  );
}

export default BudgetRoutes;
