import ProfileList from './components/profileList';
import { useNavigate } from 'react-router-dom';
import Header from 'pages/generic/header/header';
import Home from 'pages/home/Home/HomeComponent';
import { Suspense } from "react";
import { Spin } from 'antd';
const ProfilePage =()=>{
    const navigate = useNavigate();

    const handleEditProfile = () => {
        navigate(`/profile/edit`);
      };

    return(
      <>
        <Header needBackButton={false} needDivider={false} title="User Profile" buttonText="Edit Profile" onButtonClick={handleEditProfile} />
        <Suspense fallback={<Spin size="large" />}>
                <ProfileList />
          </Suspense>
    </>   
    );
};
export default ProfilePage;