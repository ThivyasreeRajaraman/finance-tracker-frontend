import CreateIncomeOrExpense from './components/CreateIncomeExpense';
import './style.css';
import Header from 'pages/generic/header/header';

const CreateIncome = () => {
    return (
        <>
            <Header needBackButton={true} needDivider={false} title="Add New Income" />
            <CreateIncomeOrExpense transactionType="Income"/>
        </>
    );
};

export default CreateIncome;
