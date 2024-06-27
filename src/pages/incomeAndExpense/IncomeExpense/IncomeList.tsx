import { useNavigate } from 'react-router-dom';
import IncomeOrExpenseList from './components/IncomeExpenseList';
import './style.css';
import Header from 'pages/generic/header/header';
import { Layout } from 'antd';

const { Content } = Layout;

const IncomeListPage = () => {
  const navigate = useNavigate();

  const handleCreateIncome = () => {
    navigate("/income/create");
  };

  return (
    <>
        <Header needBackButton={false} needDivider={true} 
        title={`Income`}
        buttonText={`+ Add Income`} 
        onButtonClick={handleCreateIncome} />
        <IncomeOrExpenseList transactionType="Income"/>
    </>
  );
};

export default IncomeListPage;
