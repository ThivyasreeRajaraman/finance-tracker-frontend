import './style.css'; // Import the styles
import Header from 'pages/generic/header/header';
import EditProfileModal from './components/EditProfile';

const EditProfilePage= () => {
    return (
        <>
            <Header title="Edit Profile" needBackButton={true} needDivider={true}/>
            <EditProfileModal  />
        </>
    );
};

export default EditProfilePage;
