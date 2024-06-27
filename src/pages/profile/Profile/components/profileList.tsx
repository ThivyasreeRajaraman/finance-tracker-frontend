import React, { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState, useRecoilValueLoadable } from 'recoil';
import { Card, Typography, Avatar, Row, Col, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { fetchUserSelector, mapUserDataToFormType, updateUserProfile } from '../store/ProfileSelectors';
import './style.css';
import { EditUserProfileAtom, UserProfileAtom } from '../store/ProfileAtoms';

const { Title, Text } = Typography;

const ProfileList = () => {
  const userLoadable = useRecoilValueLoadable(fetchUserSelector);
  const updateUserLoadable = useRecoilValueLoadable(updateUserProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useRecoilState(EditUserProfileAtom);
  const [userProfileData, setUserProfileData] = useRecoilState(UserProfileAtom)
  const [inputName, setInputName] = useState('');

  useEffect(() => {
    if (userLoadable.state == 'hasValue' && userLoadable.contents !== undefined) {
      const userData = mapUserDataToFormType(userLoadable.contents)
      setUserProfileData(userData)
    }
  }, [userLoadable, setName, updateUserLoadable]);

  useEffect(() => {
    if (updateUserLoadable.state == 'hasValue' && updateUserLoadable.contents !== undefined) {
      console.log("use effect user data:",updateUserLoadable.contents)
      setUserProfileData((prevData) => ({
        ...prevData,
        name: updateUserLoadable.contents.name,
      }));
    }
  }, [setName, updateUserLoadable])

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      const storedName = localStorage.getItem('userName') || '';
      setInputName(storedName);
    }
  };

  const handleSave = () => {
    toggleEdit();
    setName({name: inputName})
    setUserProfileData((prevData) => ({ ...prevData, name: inputName }));
    console.log("Updated name:", inputName, userProfileData);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
  };

  return (
    <>
      <div className="profile-page">
        <Card bordered={false} className="profile-card">
          <Row>
            <Col span={16}>
              <Row gutter={[0, 16]} className="profile-details">
                <Col span={24}>
                  <Title level={4} className="profile-item">
                    <Text className='profile-label' strong>Name: </Text>
                    {isEditing ? (
                      <Input
                        className="profile-value"
                        value={inputName}
                      onChange={handleNameChange}
                      />
                    ) : (
                      <Text className="profile-value1">{userProfileData.name}</Text>
                    )}
                    <Button className='edit-button' onClick={isEditing ? handleSave : toggleEdit} type="link">
                      {isEditing ? 'Save' : 'Edit'}
                    </Button>
                  </Title>
                </Col>
                <Col span={24}>
                  <Title level={4} className="profile-item">
                    <Text className='profile-label' strong>Email: </Text>
                    <Text className="profile-value2">{userProfileData.email}</Text>
                  </Title>
                </Col>
                <Col span={24}>
                  <Title level={4} className="profile-item">
                    <Text className='profile-label' strong>Default Currency: </Text>
                    <Text className="profile-value3">{userProfileData.default_currency}</Text>
                  </Title>
                </Col>
              </Row>
            </Col>
            <Col span={8} className="profile-image">
              <Avatar size={150} icon={<UserOutlined />} />
            </Col>
          </Row>
        </Card>
      </div>
    </>

  );
};

export default ProfileList;
