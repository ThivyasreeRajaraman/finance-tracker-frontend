import CreateRecurringExpenseModal from './components/CreateRecurringExpense';
import './style.css';
import Home from 'pages/home/Home/HomeComponent';
import Header from 'pages/generic/header/header';

const CreateRecurringExpensePage = () => {
    return (
        <>
            <Header needBackButton={true} needDivider={false} title="Create New Recurring Expense" />
            <CreateRecurringExpenseModal />
        </>
    );
};

export default CreateRecurringExpensePage;
