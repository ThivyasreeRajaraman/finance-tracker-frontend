import { Route, Routes } from 'react-router-dom';
import LendBorrowListPage from '../LendBorrow/LendBorrowList';
import CreateLendBorrowPage from '../LendBorrow/CreateLendBorrow';
function LendBorrowRoutes() {
  return (
    <Routes>
      <Route index element={<LendBorrowListPage />} />
      <Route path="create" element={<CreateLendBorrowPage />} />
    </Routes>
  );
}

export default LendBorrowRoutes;
