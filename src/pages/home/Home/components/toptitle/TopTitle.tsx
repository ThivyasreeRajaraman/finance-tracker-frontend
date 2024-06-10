import React, { useEffect, useState, useRef } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { isUserLoggedIn } from 'pages/login/Login/store/LoginSelector';
import { Row, Col, Modal, Button, Spin, Badge } from 'antd';
import LoadingIndicator from 'pages/generic/components/Loader/Loader';
import { remindersDataSelector } from '../../store/HomeSelectors';
import { ReminderMessageType, RemindersData } from '../../store/HomeTypes';
import { getLoadableStateAndContents } from 'pages/generic/helpers/LoadableHelper';
import { modalVisibleState } from '../../store/HomeAtoms';
import apiClient from 'pages/generic/apiUtils/client';
import { HandleErrorResponse } from 'pages/generic/apiUtils/apiErrorHandling';
import { message } from 'antd';
import UserProfile from '../userprofile/UserProfile';

const TopTitle = () => {
  const navigate = useNavigate();
  const notificationIconRef = useRef(null);
  const isAuthenticated = useRecoilValue(isUserLoggedIn);
  const [modalVisible, setModalVisible] = useRecoilState(modalVisibleState);
  const [reminders, setReminders] = useState<ReminderMessageType[]>([]);
  const remindersDataLoadable = useRecoilValueLoadable(remindersDataSelector);
  // const setRemindersData = useSetRecoilState(remindersDataSelector);
  const { loading: notificationLoading, error: notificationError, data: notification } = getLoadableStateAndContents(remindersDataLoadable);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (remindersDataLoadable.state === 'hasValue') {
      const data = remindersDataLoadable.contents as RemindersData;
      if (data && data.Reminder) {
        setReminders(data.Reminder);
      } else {
        setReminders([]);
      }
    }
  }, [notification, remindersDataLoadable, setModalVisible]);

  const handleTitleClick = () => {
    navigate('/homepage');
  };

  const handleNotificationClick = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const updateRemindersState = (id: number) => {
    setReminders((prevReminders) => prevReminders.filter(reminder => reminder.id !== id));
    handleModalClose();
  };

  const renderReminders = () => {
    return reminders.map((reminder: ReminderMessageType, index: number) => {
      return (
        <div key={index}>
          <p className='reminder-message'>{reminder.reminders}</p>
          <Button className='continue-button' onClick={() => handleContinue(reminder.id)}>Continue</Button>
          <Button className='deactivate-button' onClick={() => handleDeactivate(reminder.id)}>Deactivate</Button>
        </div>
      );
    });
  };

  const handleContinue = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await apiClient(token).put(`api/user/recurringExpense/${id}/updateNextExpenseDate`);
      updateRemindersState(id);
      handleModalClose();
      message.success('Next expense date is updated successfully');
    } catch (error) {
      console.error('Error updating next expense date:', error);
      HandleErrorResponse(error);
    }
  };

  const handleDeactivate = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await apiClient(token).put(`api/user/recurringExpense/${id}`, { active: false });
      updateRemindersState(id);
      handleModalClose();
      message.success('Recurring expense deactivated successfully');
    } catch (error) {
      console.error('Error deactivating recurring expense:', error);
      HandleErrorResponse(error);
    }
  };

  return (
    <>
      <Row className='top-title' align='middle' justify='space-between'>
        <Col className='shopup-logo-container' onClick={handleTitleClick}>
          <React.Suspense fallback={<LoadingIndicator />}>
            <img src='/images/shopup_logo.svg' alt='shopup logo' />
          </React.Suspense>
        </Col>
        <Col className='actions'>
          <Badge count={reminders.length} overflowCount={99}>
            <img
              src='/images/notification.png'
              alt='notification'
              className='notification'
              onClick={handleNotificationClick}
              ref={notificationIconRef}
            />
          </Badge>
          <UserProfile />
        </Col>
      </Row>

      <Modal
        title='Reminders'
        visible={modalVisible}
        onCancel={handleModalClose}
        className='notification-modal'
        footer={null}
      >
        {notificationLoading && <Spin />}
        {notificationError && <p>Error loading reminders</p>}
        {reminders.length === 0 && !notificationLoading ? (
          <p>No reminders</p>
        ) : (
          renderReminders()
        )}
      </Modal>
    </>
  );
};

export default TopTitle;
