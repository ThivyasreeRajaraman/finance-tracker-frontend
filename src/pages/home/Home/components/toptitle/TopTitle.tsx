import { useEffect } from 'react';
import './style.css';
import UserMenu from '../userMenu/UserMenu';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isUserLoggedIn } from 'pages/login/Login/store/LoginSelector';

const TopTitle = () => {
  const navigate = useNavigate();
  const isAuthenticated = useRecoilValue(isUserLoggedIn);
  console.log('isAuth::',isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleTitleClick = () => {
    navigate('/homepage');
  };

  return (
    <div className="top-title">
      <h2 className="app-name" onClick={handleTitleClick}>Finance Tracker</h2>
      <div className="remaining-content"><UserMenu /></div>
    </div>
  );
};

export default TopTitle;
