import { Route, Routes } from 'react-router-dom';
import LoginRoute from 'pages/login/Utils/LoginRoute';
import HomeRoute from 'pages/home/Utils/HomeRoute';
import RecurringExpenseRoutes from 'pages/recurringExpense/Utils/RecurringExpenseRoute';
import Home from 'pages/home/Home/HomeComponent';
import ProfileRoutes from 'pages/profile/Utils/ProfileRoute';
import BudgetRoutes from 'pages/budget/Utils/BudgetRoute';
import LendBorrowRoutes from 'pages/lendBorrow/Utils/LendBorrowRoute';

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginRoute />} />
            <Route path="/homepage" element={<HomeRoute />} />
            <Route element={<Home />}> 
               <Route path="/profile/*" element={<ProfileRoutes />} />
            </Route> 
            <Route element={<Home />}> 
               <Route path="/budget/*" element={<BudgetRoutes />} />
            </Route> 
            <Route element={<Home />}> 
               <Route path="/transaction/*" element={<LendBorrowRoutes />} />
            </Route> 
            <Route element={<Home />}> 
               <Route path="/recurringExpense/*" element={<RecurringExpenseRoutes />} />
            </Route>        
        </Routes>
    );
};

export default MainRoutes;
