import { useState,Suspense } from 'react';
import TopTitle from './components/toptitle/TopTitle';
import Sidebar from './components/sidebar/SideBar';
import './style.css';
import { Row, Col } from 'antd';
import CustomCard from 'pages/generic/components/Card/Card';
import CurrencyPopup from './components/currencyPopup/CurrencyPopup';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { transactionTotalSelector } from './store/HomeSelectors';
import { formatCurrency } from 'pages/generic/helpers/FormatHelpers';
import { remindersDataSelector, categoryWiseTotalSelector } from './store/HomeSelectors';
import PieChart from 'pages/generic/components/Charts/PieChart';
import { transformData, transformDataForTransactions } from 'pages/generic/helpers/FormatHelpers';
import { TransformedData, TransformedDataForCategory } from './store/HomeTypes';

const Home = () => {
  const transactionTotalLoadable = useRecoilValueLoadable(transactionTotalSelector);
  const reminderLoadable = useRecoilValueLoadable(remindersDataSelector);
  const [, setSelectedCurrency] = useState<string | null>(null);

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
  };
  const categoryWiseTotalLoadable = useRecoilValueLoadable(categoryWiseTotalSelector);

  if (transactionTotalLoadable.state === 'loading' && reminderLoadable.state === 'loading' && categoryWiseTotalLoadable.state === 'loading') {
    return <div>Loading...</div>;
  }

  if (transactionTotalLoadable.state === 'hasValue' && reminderLoadable.state === 'hasValue' && categoryWiseTotalLoadable.state === 'hasValue') {

    const transactionTotal = transactionTotalLoadable.contents;
    const transformedData = transformData(transactionTotal);
    const categoryWiseTransactionTotal = categoryWiseTotalLoadable.contents;
    console.log("data in home::", categoryWiseTransactionTotal)

    const budgetData = categoryWiseTransactionTotal.budget;
    const transformedBudgetData = transformDataForTransactions(budgetData);
    const expenseData = categoryWiseTransactionTotal.expense;
    const transformedExpenseData = transformDataForTransactions(expenseData);
    const incomeData = categoryWiseTransactionTotal.income;
    const transformedIncomeData = transformDataForTransactions(incomeData);

    return (
      <>
      {/* <CurrencyPopup onCurrencyChange={handleCurrencyChange}/> */}
        <Row className="main-title">Finance Tracker</Row>
        <Row className='chart-row'>
          <Col className='chart-column'>
            <Row className='pie-chart'><PieChart title="Summary of transactions" data={transformedData} /></Row>
          </Col>
          <Col className='chart-column'>
            <Row className='pie-chart'><PieChart title='Income'  data={transformedIncomeData} /></Row>
          </Col>
        </Row>
        <Row className='chart-row'>
          <Col className='chart-column'>
            <Row className='pie-chart'><PieChart title='Budget' data={transformedBudgetData} /></Row>
          </Col>
          <Col className='chart-column'>
            <Row className='pie-chart'><PieChart title='Expense' data={transformedExpenseData} /></Row>
          </Col>
        </Row>


      </>
    );
  }

  if (transactionTotalLoadable.state === 'hasError') {
    return <div>Error fetching transaction total.</div>;
  }

  return null;
};

export default Home;
