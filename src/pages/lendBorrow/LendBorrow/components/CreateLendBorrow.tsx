import { DatePicker, Button, Form, Input, message, Select, Space, Row, Col } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';
import { fetchPartnersSelector,createOrUpdateLendBorrow,lendBorrowDataSelector } from '../store/LendBorrowSelectors';
import { useRecoilValueLoadable, useRecoilState, useRecoilCallback, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { transactionIdState,formState,CreateLendBorrowPayloadAtom } from '../store/LendBorrowAtoms';
import { getLoadableStateAndContents } from 'pages/generic/helpers/LoadableHelper';
import GenericButton from 'pages/generic/components/Button/Button';
import { FORM_RULE, TRANSACTION_OPTIONS } from 'pages/generic/helpers/const';
import { CreateLendBorrowFormType,CreateLendBorrowPayloadType } from '../store/LendBorrowTypes';
import { useParams } from 'react-router-dom';
import { fetchCurrenciesSelector } from 'pages/home/Home/store/CurrencySelectors';

const { Option } = Select;
const { Item } = Form;

const CreateLendBorrowModal = () => {
    const navigate = useNavigate();
    const { transactionId } = useParams();
    const [transactionIdFromState, setTransactionIdState] = useRecoilState(transactionIdState);
    const [LendBorrowPayload, setLendBorrowPayload] = useRecoilState(CreateLendBorrowPayloadAtom);
    const partnersLoadable = useRecoilValueLoadable(fetchPartnersSelector);
    const currenciesLoadable =useRecoilValueLoadable(fetchCurrenciesSelector)
    const lendBorrowDataLoadable = useRecoilValueLoadable(lendBorrowDataSelector);
    const createOrUpdateLendBorrowLoadable = useRecoilValueLoadable(createOrUpdateLendBorrow);
    const [CreateLendBorrowForm] = useForm<CreateLendBorrowFormType>();
    const formValues = useRecoilValue(formState);

    const [valuesToUpdate, setValuesToUpdate] = useState<CreateLendBorrowFormType | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [isNewPartner, setIsNewPartner] = useState(false);
    const [newPartner, setNewPartner] = useState('');

    const { loading: partnersLoading, error: partnersError, data: partners } = getLoadableStateAndContents(partnersLoadable);

    useEffect(() => {
        if (createOrUpdateLendBorrowLoadable.state === 'hasValue' && createOrUpdateLendBorrowLoadable.contents != undefined) {
            console.log("inside hook:",createOrUpdateLendBorrowLoadable)
            const response = createOrUpdateLendBorrowLoadable.contents;
            console.log("response in useeffect::",response)             
            message.success(response?.message);
            navigate('/transaction');
        } else if (createOrUpdateLendBorrowLoadable.state === 'hasError') {
            message.error("An error occurred while processing the request.");
        }
    }, [createOrUpdateLendBorrowLoadable, setLendBorrowPayload]);

    const handlePartnerChange = (value: string) => {
        setIsNewPartner(value === "Others");
    };


    const handleSubmit = async (values: CreateLendBorrowFormType) => {
        const isoDateString = values.payment_due_date?.format("YYYY-MM-DD") || undefined;
        let amountString: number = NaN;

        if (values.amount !== null) {
            amountString = parseFloat(values.amount.toString());
        }

        console.log("partner",values.transaction_partner)

        const updatedLendBorrowValues: CreateLendBorrowPayloadType = {
            transaction_partner: isNewPartner? newPartner: values.transaction_partner,
            amount: amountString,
            transaction_type: values.transaction_type,
            payment_due_date: isoDateString,
            currency:values.currency,
        };
        setLendBorrowPayload(updatedLendBorrowValues)
    };

    const handleReset = () => {
        CreateLendBorrowForm.resetFields();
        setIsNewPartner(false);
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
                    <Select placeholder="Select Partner" allowClear showSearch onChange={handlePartnerChange}>
                    {Array.isArray(partners) && partners.length > 0 ? (
                        partners?.map((partner: string, index: number) => (
                            <Option key={index} value={partner}>
                                {partner}
                            </Option>
                        ))
                    ) : (
                        <Option value="" disabled>
                            Select Partner
                        </Option>
                    )}
                    <Option value="Others">New Partner</Option>
                    </Select>
                </Form.Item>
                {isNewPartner && (
                            <Form.Item
                                label="New Partner"
                                name="new_partner"
                                rules={[{ required: true, message: FORM_RULE }]}
                            >
                                <Input placeholder='Enter partner name' value={newPartner} onChange={(e) => setNewPartner(e.target.value)} />
                            </Form.Item>
                        )}

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