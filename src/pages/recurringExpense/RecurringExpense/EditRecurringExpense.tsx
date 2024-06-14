import CreateRecurringExpenseModal from './components/CreateRecurringExpense';
import './style.css'; // Import the styles
import Header from 'pages/generic/header/header';

const EditRecurringExpensePage = () => {

    return (
        <>
            <Header needBackButton={true} needDivider={false} title="Edit Recurring Expense" />
            <CreateRecurringExpenseModal />
        </>
    );
};

export default EditRecurringExpensePage;
