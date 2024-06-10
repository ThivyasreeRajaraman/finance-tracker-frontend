import { useNavigate } from 'react-router-dom';
import { LendBorrow } from './store/LendBorrowTypes';
import LendBorrowList from './components/LendBorrowList';
import './style.css';
import Header from 'pages/generic/header/header';

const LendBorrowListPage = () => {
  const navigate = useNavigate();

  const handleCreateLendBorrow = () => {
    navigate('/transaction/create');
  };

  const handleEdit = (lendBorrow: LendBorrow) => {
    navigate(`/transaction/${lendBorrow.id}/edit`);
  };

  const handleDelete = (lendBorrow: LendBorrow) => {
    // Handle delete action
  };

  return (
    <>
        <Header needBackButton={false} needDivider={true} title="Lend/Borrow Transactions" buttonText="+ Create Transaction" onButtonClick={handleCreateLendBorrow} />
        <LendBorrowList onEdit={handleEdit} onDelete={handleDelete} />
    </>
  );
};

export default LendBorrowListPage;
