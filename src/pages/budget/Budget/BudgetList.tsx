import { useNavigate } from 'react-router-dom';
import { Budget } from './store/BudgetTypes';
import BudgetList from './components/BudgetList';
import './style.css';
import Header from 'pages/generic/header/header';


const BudgetListPage = () => {
  const navigate = useNavigate();

  const handleCreateBudget = () => {
    navigate('/budget/create');
  };

  const handleEdit = (budget: Budget) => {
    navigate(`/budget/${budget.id}/edit`);
  };

  const handleDelete = (budget: Budget) => {
    // Handle delete action
  };

  return (
    <>
        <Header needBackButton={false} needDivider={true} title="Budgets" buttonText="+ Create Budget" onButtonClick={handleCreateBudget} />
        <BudgetList onEdit={handleEdit} onDelete={handleDelete} />
    </>
  );
};

export default BudgetListPage;
