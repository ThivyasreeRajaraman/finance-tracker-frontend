import { useState,Suspense } from 'react';
import TopTitle from './components/toptitle/TopTitle';
import Sidebar from './components/sidebar/SideBar';
import CurrencyPopup from './components/currencyPopup/CurrencyPopup';
import { Outlet } from 'react-router-dom';
import './style.css';

const Home = () => {
  const [, setSelectedCurrency] = useState<string | null>(null);

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
  };
  return (
    <div className="home-container">
      <TopTitle />
      <div className="content-wrapper">
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="main-content">
          <div className="main-content-inner">
          <CurrencyPopup
                  onCurrencyChange={handleCurrencyChange}
                />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
