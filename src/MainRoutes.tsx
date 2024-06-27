import { Route, Routes } from 'react-router-dom';
import LoginRoute from 'pages/login/Utils/LoginRoute';
import HomeRoute from 'pages/home/Utils/HomeRoute';
import RecurringExpenseRoutes from 'pages/recurringExpense/Utils/RecurringExpenseRoute';
import Layout from 'pages/generic/components/Layout/Layout';
import { ExpenseRoutes, IncomeRoutes } from 'pages/incomeAndExpense/Utils/IncomeExpenseRoutes';
import ProfileRoutes from 'pages/profile/Utils/ProfileRoute';
import BudgetRoutes from 'pages/budget/Utils/BudgetRoute';
import LendBorrowRoutes from 'pages/lendBorrow/Utils/LendBorrowRoute';


const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginRoute />} />

            <Route element={<Layout />}>
                <Route path="/homepage" element={<HomeRoute />} />
                <Route path="/profile/*" element={<ProfileRoutes />} />
                <Route path="/recurringExpense/*" element={<RecurringExpenseRoutes />} />
                <Route path="/income/*" element={<IncomeRoutes />} />
                <Route path="/expense/*" element={<ExpenseRoutes />} />
                <Route path="/budget/*" element={<BudgetRoutes />} />
                <Route path="/transaction/*" element={<LendBorrowRoutes />} />
            </Route>
        </Routes>
    );
};

export default MainRoutes;
