import CreateIncomeOrExpense from './components/CreateIncomeExpense';
import './style.css';
import Header from 'pages/generic/header/header';

const EditIncome = () => {

    return (
        <>
            <Header needBackButton={true} needDivider={false} title="Edit Income" />
            <CreateIncomeOrExpense transactionType="Income"/>
        </>
    );
};

export default EditIncome;
