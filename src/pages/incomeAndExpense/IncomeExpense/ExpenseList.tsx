import { useNavigate } from 'react-router-dom';
import IncomeOrExpenseList from './components/IncomeExpenseList';
import './style.css';
import Header from 'pages/generic/header/header';
import { Layout } from 'antd';

const { Content } = Layout;

const ExpenseListPage = () => {
  const navigate = useNavigate();

  const handleCreateExpense = () => {
    navigate("/expense/create");
  };

  return (
    <>
        <Header needBackButton={false} needDivider={true} 
        title={`Expenses`}
        buttonText={`+ Add Expense`} 
        onButtonClick={handleCreateExpense} />
        <IncomeOrExpenseList transactionType="Expense"/>
    </>
  );
};

export default ExpenseListPage;
