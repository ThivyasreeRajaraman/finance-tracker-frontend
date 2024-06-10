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
import { remindersDataSelector } from './store/HomeSelectors';

const Home = () => {
  const transactionTotalLoadable = useRecoilValueLoadable(transactionTotalSelector);
  const reminderLoadable = useRecoilValueLoadable(remindersDataSelector);
  const [, setSelectedCurrency] = useState<string | null>(null);

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
  };

  if (transactionTotalLoadable.state === 'loading' && reminderLoadable.state === 'loading') {
    return <div>Loading...</div>;
  }

  if (transactionTotalLoadable.state === 'hasValue' && reminderLoadable.state === 'hasValue') {
    console.log("valllll:",reminderLoadable.contents, reminderLoadable)
    const transactionTotal = transactionTotalLoadable.contents;

    return (
      <>
      {/* <CurrencyPopup onCurrencyChange={handleCurrencyChange}/> */}
        <Row className="main-title">Finance Tracker</Row>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <CustomCard title="Income" content={formatCurrency(transactionTotal.income)} titleColor="#1890ff" />
          </Col>
          <Col span={8}>
            <CustomCard title="Expense" content={formatCurrency(transactionTotal.expense)} titleColor="#f5222d"/>
          </Col>
          <Col span={8}>
            <CustomCard title="Budget" content={formatCurrency(transactionTotal.budget)} titleColor="#52c41a"/>
          </Col>
          <Col span={12}>
            <CustomCard title="Lent" content={formatCurrency(transactionTotal.lend)} titleColor="#faad14"/>
          </Col>
          <Col span={12}>
            <CustomCard title="Borrowed" content={formatCurrency(transactionTotal.borrow)} titleColor="#722ed1" />
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
