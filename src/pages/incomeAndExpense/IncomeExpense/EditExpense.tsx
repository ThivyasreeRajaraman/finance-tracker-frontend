import CreateIncomeOrExpense from './components/CreateIncomeExpense';
import './style.css';
import Header from 'pages/generic/header/header';

const EditExpense = () => {

    return (
        <>
            <Header needBackButton={true} needDivider={false} title="Edit Expense" />
            <CreateIncomeOrExpense transactionType="Expense"/>
        </>
    );
};

export default EditExpense;
