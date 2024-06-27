import React, { useState } from 'react';
import { useRecoilValue,useRecoilCallback,useRecoilState } from 'recoil';
import { Select,message,Modal } from 'antd';
import { fetchCurrenciesSelector,updateDefaultCurrencySelector } from '../../store/CurrencySelectors';
import { userData } from 'pages/login/Login/store/LoginAtoms';

const { Option } = Select;


const CurrencyPopup = ({onCurrencyChange }:{onCurrencyChange: (currency: string)=> void}) => {
  const user = useRecoilValue(userData)
  const [isPopupVisible, setIsPopupVisible] = useState(() => {
    return user?.currency === null;
  });
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const currencies = useRecoilValue(fetchCurrenciesSelector);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentUser, setUser] = useRecoilState(userData);

  const updateCurrency = useRecoilCallback(
    ({ snapshot}) => async (currency: string) => {
      setLoading(true);
      try {
        await snapshot.getPromise(updateDefaultCurrencySelector(currency));
        if (currentUser){
          const updatedUser = { ...currentUser, currency: currency };
          setUser(updatedUser);
        }
        message.success('Default currency updated successfully');
        onCurrencyChange(currency);
      } catch (error) {
        console.error('Failed to update default currency:', error);
        message.error('Failed to update default currency');
      } finally {
        setLoading(false);
      }
    },
    []
  );
  
  const handleCurrencySelect = (currency: string) => {
    setSelectedCurrency(currency);
    updateCurrency(currency);
    setIsPopupVisible(false)
  }

  if (!isPopupVisible) return null;

  return (
    <Modal
      open={isPopupVisible}
      title="Select Currency"
      footer={null}
      closable={false}
    >
        <Select
          placeholder="Select a currency"
          style={{ width: '100%' }}
          value={selectedCurrency}
          onChange={handleCurrencySelect}
          loading={loading}
        >
          {currencies.map((currency: string) => (
            <Option key={currency} value={currency}>
              {currency}
            </Option>
          ))}
        </Select>
    </Modal>
  );
};

export default CurrencyPopup;
