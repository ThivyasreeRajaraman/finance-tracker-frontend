import ProfileList from './components/profileList';
import { useNavigate } from 'react-router-dom';
import Header from 'pages/generic/header/header';
import { Suspense } from "react";
import { Spin } from 'antd';
const ProfilePage =()=>{
    const navigate = useNavigate();

    const handleEditProfile = () => {
        navigate(`/profile/edit`);
      };

    return(
      <>
        <Header needBackButton={false} needDivider={false} title="User Profile" />
        <Suspense fallback={<Spin size="large" />}>
                <ProfileList />
          </Suspense>
    </>   
    );
};
export default ProfilePage;