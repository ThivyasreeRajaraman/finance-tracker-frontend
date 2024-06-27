import CreateBudgetModal from './components/CreateBudget';
import './style.css'; // Import the styles
import Header from 'pages/generic/header/header';

const EditBudgetPage = () => {

    return (
        <>
            <Header needBackButton={true} needDivider={false} title="Edit Budget" />
            <CreateBudgetModal />
        </>
    );
};

export default EditBudgetPage;
