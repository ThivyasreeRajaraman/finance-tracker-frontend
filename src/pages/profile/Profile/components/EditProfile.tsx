import { Button, Form, Input, message, Select, Space,Typography,Descriptions } from 'antd';
import { useState } from 'react';
import { ErrorResponseType } from 'pages/generic/apiUtils/apiTypes';
import { useForm } from 'antd/lib/form/Form';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { HandleErrorResponse } from 'pages/generic/apiUtils/apiErrorHandling';
import { useNavigate } from 'react-router-dom';
import { fetchCurrenciesSelector } from 'pages/home/Home/store/CurrencySelectors';
import { fetchUserSelector,mapUserDataToFormType, updateUserProfile } from '../store/ProfileSelectors';
import { ProfileFormType } from '../store/profileType';
import { RuleObject } from 'antd/es/form';
import './style.css';

const { Option } = Select;
const { Text } = Typography;

const EditProfileModal = () => {
    
    const navigate = useNavigate();
    const currenciesLoadable = useRecoilValueLoadable(fetchCurrenciesSelector);
    console.log("currency::", currenciesLoadable)

    const [errorState, setErrorState] = useState<ErrorResponseType | null>(null);
    const [ProfileForm] = useForm<ProfileFormType>();
    const { setFieldsValue, getFieldValue, resetFields } = ProfileForm;

    const userData = useRecoilValue(fetchUserSelector);
    console.log("user data::",userData)
    const formData = mapUserDataToFormType(userData);
    console.log("form data::",formData)

    const handleSelectCurrency = (value: string) => {
        setFieldsValue({ default_currency: value });
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const validateAtLeastOneField = ({ getFieldValue }: { getFieldValue: (name: string) => any }): RuleObject  => ({
        validator(_: RuleObject, value: any) {
          const name = getFieldValue('name');
          const currency = getFieldValue('default_currency');
          if (!name && !currency) {
            return Promise.reject(new Error('At least one field is required.'));
          }
          return Promise.resolve();
        },
      });

    const handleSubmit = async (values: ProfileFormType) => {
        console.log('Form values:', values);
        try {
            const response = await updateUserProfile(values);
            console.log('Response:', response);
            message.success(response.message);
            navigate('/profile');
            setErrorState(null);
        } catch (error: any) {
            console.log("errornow::",error)
            HandleErrorResponse(error);
        }
    };

    return (
        <>
            <Form
                layout="vertical"
                name="ProfileForm"
                form={ProfileForm}
                onFinish={handleSubmit}
                initialValues={formData}
                validateTrigger="onChange"
            >
                <Form.Item
                    label="Currency"
                    name="default_currency"
                    
                    rules={[{ required: true }, validateAtLeastOneField]}
                >
                    <Select onChange={handleSelectCurrency} placeholder="Select Currency" disabled={false} allowClear>
                        {currenciesLoadable.state === 'loading' && <Option value="">Loading...</Option>}
                        {currenciesLoadable.state === 'hasError' && <Option value="">Error loading currencies</Option>}
                        {currenciesLoadable.state === 'hasValue' &&
                            currenciesLoadable.contents.map((currency: string, index: number) => (
                                <Option key={index} value={currency}>
                                    {currency}
                                </Option>
                            ))}
                    </Select>
                </Form.Item>


                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true },validateAtLeastOneField]}
                >
                    <Input type="text" />
                </Form.Item>
                {/* <Descriptions column={1} bordered>
                        <Descriptions.Item label="Name">{formData.name}</Descriptions.Item>
                    </Descriptions> */}

                <Form.Item
                    wrapperCol={{ offset: 8 }}
                >
                    <Space>
                        <Button htmlType="button" onClick={handleCancel} >
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit" >
                            Update
                        </Button>
                    </Space>
                </Form.Item>
            </Form>

        </>
    );
};

export default EditProfileModal;