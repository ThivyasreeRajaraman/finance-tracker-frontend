import CreateBudgetModal from './components/CreateBudget';
import './style.css';
import Header from 'pages/generic/header/header';

const CreateBudgetPage = () => {
    return (
        <>
            <Header needBackButton={true} needDivider={false} title="Create New Budget" />
            <CreateBudgetModal />
        </>
    );
};

export default CreateBudgetPage;
