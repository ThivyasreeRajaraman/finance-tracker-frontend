import { Route, Routes } from 'react-router-dom';
// import EditProfilePage from '../Profile/EditProfile';
import ProfilePage from '../Profile/Profile';
function ProfileRoutes() {
  return (
    <Routes>
      <Route index element={<ProfilePage />} />
      {/* <Route path="edit" element={<EditProfilePage />} /> */}
    </Routes>
  );
}

export default ProfileRoutes;
