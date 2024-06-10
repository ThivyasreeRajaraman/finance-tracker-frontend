import React from 'react';
import { useParams } from 'react-router-dom';
import CreateRecurringExpenseModal from './components/CreateRecurringExpense';
import './style.css'; // Import the styles
import Header from 'pages/generic/header/header';
import Home from 'pages/home/Home/HomeComponent';

const EditRecurringExpensePage = () => {
    return (
        <>
            <Header needBackButton={true} needDivider={false} title="Create New Recurring Expense" />
            <CreateRecurringExpenseModal />
        </>
    );
};

export default EditRecurringExpensePage;
