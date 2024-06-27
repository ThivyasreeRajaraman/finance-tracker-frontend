import CreateLendBorrowModal from './components/CreateLendBorrow';
import './style.css';
import Header from 'pages/generic/header/header';

const CreateLendBorrowPage = () => {
    return (
        <>
            <Header needBackButton={true} needDivider={false} title="Create New Transaction" />
            <CreateLendBorrowModal />
        </>
    );
};

export default CreateLendBorrowPage;
