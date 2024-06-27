import { useNavigate } from 'react-router-dom';
import RecurringExpenseList from './components/RecurringExpenseList';
import './style.css';
import Header from 'pages/generic/header/header';

const RecurringExpenseListPage = () => {
  const navigate = useNavigate();

  const handleCreateExpense = () => {
    navigate('/recurringExpense/create');
  };

  return (
    <>
        <Header needBackButton={false} needDivider={true} title="Recurring Expenses" buttonText="+ Create Recurring Expense" onButtonClick={handleCreateExpense} />
        <RecurringExpenseList />
    </>
  );
};

export default RecurringExpenseListPage;
