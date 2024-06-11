import { useState, useEffect } from 'react';
import { Row, Col, Select, Spin, Button } from 'antd';
import PieChart from 'pages/generic/components/Charts/PieChart';
import { useRecoilValueLoadable, useRecoilState } from 'recoil';
import { transactionTotalSelector } from './store/HomeSelectors';
import { remindersDataSelector, categoryWiseTotalSelector } from './store/HomeSelectors';
import { transformData, transformDataForTransactions } from 'pages/generic/helpers/FormatHelpers';
import './style.css';
import { ChartFilterParamsAtom } from './store/HomeAtoms';

const { Option } = Select;

type DataState = {
  transformedData: any;
  transformedBudgetData: any;
  transformedExpenseData: any;
  transformedIncomeData: any;
} | null;

const Home = () => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [filterParams, setFilterParams] = useRecoilState(ChartFilterParamsAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DataState>(null);

  const transactionTotalLoadable = useRecoilValueLoadable(transactionTotalSelector);
  const categoryWiseTotalLoadable = useRecoilValueLoadable(categoryWiseTotalSelector);
  const reminderLoadable = useRecoilValueLoadable(remindersDataSelector);

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const handleFilterClick = () => {
    setFilterParams({ month: selectedMonth, year: selectedYear });
  };

  useEffect(() => {
    if (
      transactionTotalLoadable.state === 'hasValue' &&
      reminderLoadable.state === 'hasValue' &&
      categoryWiseTotalLoadable.state === 'hasValue'
    ) {
      console.log('All data loaded successfully.');
      const transactionTotal = transactionTotalLoadable.contents;
      const transformedData = transformData(transactionTotal);
      const categoryWiseTransactionTotal = categoryWiseTotalLoadable.contents;
      const budgetData = categoryWiseTransactionTotal.budget;
      const transformedBudgetData = transformDataForTransactions(budgetData);
      const expenseData = categoryWiseTransactionTotal.expense;
      const transformedExpenseData = transformDataForTransactions(expenseData);
      const incomeData = categoryWiseTransactionTotal.income;
      const transformedIncomeData = transformDataForTransactions(incomeData);

      setData({
        transformedData,
        transformedBudgetData,
        transformedExpenseData,
        transformedIncomeData,
      });
      setIsLoading(false);
    }

    if (
      transactionTotalLoadable.state === 'hasError' ||
      reminderLoadable.state === 'hasError' ||
      categoryWiseTotalLoadable.state === 'hasError'
    ) {
      setIsLoading(false);
    }
  }, [
    transactionTotalLoadable,
    reminderLoadable,
    categoryWiseTotalLoadable,
  ]);

  useEffect(() => {
  }, [filterParams, setFilterParams]);

  if (isLoading) {
    return <Spin fullscreen={true} />;
  }

  if (!data) {
    return <div>Error fetching data.</div>;
  }

  const {
    transformedData,
    transformedBudgetData,
    transformedExpenseData,
    transformedIncomeData,
  } = data;

  return (
    <>
      <Row className="main-title">Finance Tracker</Row>
      <Row>
        <Col>
          <Select
            value={selectedMonth}
            className="month-dropdown"
            onChange={handleMonthChange}
          >
            {[...Array(12)].map((_, index) => (
              <Option key={index + 1} value={index + 1}>
                {new Date(new Date().getFullYear(), index).toLocaleDateString('en', { month: 'short' })}
              </Option>
            ))}
          </Select>
        </Col>
        <Col>
          <Select
            value={selectedYear}
            className="year-dropdown"
            onChange={handleYearChange}
          >
            {[...Array(5)].map((_, index) => (
              <Option key={new Date().getFullYear() - index} value={new Date().getFullYear() - index}>
                {new Date().getFullYear() - index}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={6}>
          <Button type="primary" className="filter-button" onClick={handleFilterClick}>
            Filter
          </Button>
        </Col>
      </Row>
      <Row className="chart-row">
        <Col className="chart-column">
          <PieChart title="Summary of transactions" data={transformedData} />
        </Col>
        <Col className="chart-column">
          <PieChart title="Income" data={transformedIncomeData} />
        </Col>
      </Row>
      <Row className="chart-row">
        <Col className="chart-column">
          <PieChart title="Budget" data={transformedBudgetData} />
        </Col>
        <Col className="chart-column">
          <PieChart title="Expense" data={transformedExpenseData} />
        </Col>
      </Row>
    </>
  );
};

export default Home;
