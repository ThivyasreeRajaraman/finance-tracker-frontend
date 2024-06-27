import CreateIncomeOrExpense from './components/CreateIncomeExpense';
import './style.css';
import Header from 'pages/generic/header/header';

const CreateExpense = () => {
    return (
        <>
            <Header needBackButton={true} needDivider={false} title="Add New Expense" />
            <CreateIncomeOrExpense transactionType="Expense"/>
        </>
    );
};

export default CreateExpense;
