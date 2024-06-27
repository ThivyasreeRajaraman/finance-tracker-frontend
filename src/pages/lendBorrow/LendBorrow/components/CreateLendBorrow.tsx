import { DatePicker, Button, Form, Input, message, Select, Space, Row, Col, Divider } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState,useRef } from 'react';
import { fetchPartnersSelector,createLendBorrow} from '../store/LendBorrowSelectors';
import { useRecoilValueLoadable, useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { formState,CreateLendBorrowPayloadAtom } from '../store/LendBorrowAtoms';
import GenericButton from 'pages/generic/components/Button/Button';
import { FORM_RULE, TRANSACTION_OPTIONS } from 'pages/generic/helpers/const';
import { CreateLendBorrowFormType,CreateLendBorrowPayloadType } from '../store/LendBorrowTypes';
import { fetchCurrenciesSelector } from 'pages/home/Home/store/CurrencySelectors';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';

const { Option } = Select;
const { Item } = Form;

const CreateLendBorrowModal = () => {
    const navigate = useNavigate();
    const [LendBorrowPayload, setLendBorrowPayload] = useRecoilState(CreateLendBorrowPayloadAtom);
    const partnersLoadable = useRecoilValueLoadable(fetchPartnersSelector);
    const currenciesLoadable =useRecoilValueLoadable(fetchCurrenciesSelector)
    const createLendBorrowLoadable = useRecoilValueLoadable(createLendBorrow);
    const [CreateLendBorrowForm] = useForm<CreateLendBorrowFormType>();
    const formValues = useRecoilValue(formState);
    const inputRef = useRef<InputRef>(null);

    const [partners, setPartners] = useState<string[]>([]);
    const [newPartner, setNewPartner] = useState('');


    useEffect(() => {
        if (partnersLoadable.state === 'hasValue' && partnersLoadable.contents) {
          setPartners(partnersLoadable.contents);
        }
      }, [partnersLoadable]);

    useEffect(() => {
        if (createLendBorrowLoadable.state === 'hasValue' && createLendBorrowLoadable.contents != undefined) {
            console.log("inside hook:",createLendBorrowLoadable)
            const response = createLendBorrowLoadable.contents;
            console.log("response in useeffect::",response)             
            message.success(response?.message);
            navigate('/transaction');
        } else if (createLendBorrowLoadable.state === 'hasError') {
            message.error("An error occurred while processing the request.");
        }
    }, [createLendBorrowLoadable, setLendBorrowPayload]);

    const handleNewPartnerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPartner(event.target.value);
    };


    const handleSubmit = async (values: CreateLendBorrowFormType) => {
        const isoDateString = values.payment_due_date?.format("YYYY-MM-DD") || undefined;
        let amountString: number = NaN;

        if (values.amount !== null) {
            amountString = parseFloat(values.amount.toString());
        }

        console.log("partner",values.transaction_partner)

        const updatedLendBorrowValues: CreateLendBorrowPayloadType = {
            transaction_partner: values.transaction_partner,
            amount: amountString,
            transaction_type: values.transaction_type,
            payment_due_date: isoDateString,
            currency:values.currency,
        };
        setLendBorrowPayload(updatedLendBorrowValues)
    };

    const addNewPartner = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        setPartners([...partners, newPartner]);
        setNewPartner('');
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      };

    const handleReset = () => {
        CreateLendBorrowForm.resetFields();
        setNewPartner('');
    };
    return (
        <>
            <Form
                layout="vertical"
                name="lendBorrowForm"
                form={CreateLendBorrowForm}
                onFinish={handleSubmit}
                validateTrigger="onBlur"
                initialValues={formValues}
            >
                <Form.Item
                 label="Partner"
                 name="transaction_partner"
                 rules={[{ required: true, message: FORM_RULE }]}
                >
                    <Select
                     placeholder='Select Transaction Partner'
                     showSearch
                     dropdownRender={(menu) => (
                        <>
                         {menu}
                         <Divider style={{margin:'8px 0'}}/>
                         <Space style={{padding:'0 8px 4px'}}>  
                            <Input
                                placeholder='Partner Name'
                                ref={inputRef}
                                value={newPartner}
                                onChange={handleNewPartnerChange}
                                onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button type="text" icon={<PlusOutlined />} onClick={addNewPartner}>
                             Add Partner
                            </Button>
                         </Space>
                        
                        </>
                     )}
                    >
                        {partners.map((partner, index) => (
                            <Option key={index} value={partner}>
                            {partner}
                            </Option>
                         ))}

                    </Select>

                </Form.Item>                

                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[{ required: true, message: FORM_RULE }]}
                >
                    <Input type="text" placeholder='Enter amount' />
                </Form.Item>
                <Form.Item
                    label="Currency"
                    name="currency"
                    rules={[{ required: true, message: FORM_RULE }]}
                >
                    <Select placeholder="Select Currency" defaultValue={localStorage.getItem('currency')} disabled={false} allowClear showSearch className='currency-dropdown'>
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

                <Item
                    label="Transaction Type"
                    name="transaction_type"
                    rules={[{ required: true, message: FORM_RULE }]}
                >
                    <Select placeholder="Select Transaction Type" allowClear showSearch>
                        {TRANSACTION_OPTIONS.map(option => (
                            <Option key={option.value} value={option.value}>
                                {option.label}
                            </Option>
                        ))}
                    </Select>
                </Item>

                <Form.Item
                    label="Payment Due Date"
                    name="payment_due_date"
                    rules={[{ required: true, message: FORM_RULE }]}
                >
                    <DatePicker
                        format="YYYY-MM-DD"
                    />
                </Form.Item>

                <Row className='button-row'>
                    <Col>
                        <Item wrapperCol={{ offset: 0 }}>
                            <Space>
                            <Button className='reset-button' onClick={handleReset}>Reset</Button>
                                    <GenericButton text="Create" />
                            </Space>
                        </Item>
                    </Col>
                </Row>
            </Form>

        </>
    );
};

export default CreateLendBorrowModal;