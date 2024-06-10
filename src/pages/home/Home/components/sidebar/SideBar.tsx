import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li className="menu-item">
          <Link to="/budget">Budget</Link>
        </li>
        <li className="menu-item">
          <Link to="/api/user/">Income</Link>
        </li>
        <li className="menu-item">
          <Link to="/api/user/">Expense</Link>
        </li>
        <li className="menu-item">
          <Link to="/transaction">Lend/Borrow</Link>
        </li>
        <li className="menu-item">
          <Link to="/recurringExpense">Recurring Expense</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
