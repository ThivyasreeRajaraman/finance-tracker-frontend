import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RecurringExpense } from './store/RecurringExpenseTypes';
import RecurringExpenseList from './components/RecurringExpenseList';
import './style.css';
import Header from 'pages/generic/header/header';
import Home from 'pages/home/Home/HomeComponent';
import { Layout } from 'antd';
import TopTitle from 'pages/home/Home/components/toptitle/TopTitle';
import Sidebar from 'pages/home/Home/components/sidebar/SideBar';

const { Content } = Layout;

const RecurringExpenseListPage = () => {
  const navigate = useNavigate();

  const handleCreateExpense = () => {
    navigate('/recurringExpense/create');
  };

  const handleEdit = (expense: RecurringExpense) => {
    navigate(`/recurringExpense/${expense.id}/edit`);
  };

  const handleDelete = (expense: RecurringExpense) => {
    // Handle delete action
  };

  return (
    <>
        <Header needBackButton={false} needDivider={true} title="Recurring Expenses" buttonText="+ Create Recurring Expense" onButtonClick={handleCreateExpense} />
        <RecurringExpenseList onEdit={handleEdit} onDelete={handleDelete} />
    </>
  );
};

export default RecurringExpenseListPage;
