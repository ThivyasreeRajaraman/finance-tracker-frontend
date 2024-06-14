import { useNavigate } from 'react-router-dom';
import LendBorrowList from './components/LendBorrowList';
import './style.css';
import Header from 'pages/generic/header/header';

const LendBorrowListPage = () => {
  const navigate = useNavigate();

  const handleCreateLendBorrow = () => {
    navigate('/transaction/create');
  };

  return (
    <>
        <Header needBackButton={false} needDivider={true} title="Lend/Borrow Transactions" buttonText="+ Create Transaction" onButtonClick={handleCreateLendBorrow} />
        <LendBorrowList/>
    </>
  );
};

export default LendBorrowListPage;
