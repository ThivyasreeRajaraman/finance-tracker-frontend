import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import './style.css';

const Sidebar = () => {
  return (
    <Menu theme="dark" mode="inline" className="sidebar">
      <Menu.Item key="1">
        <Link to="/budget">Budget</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/income/">Income</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/expense/">Expense</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/transaction">Lend/Borrow</Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link to="/recurringExpense">Recurring Expense</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
