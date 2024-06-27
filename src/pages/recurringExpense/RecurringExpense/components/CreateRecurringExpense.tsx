import { DatePicker, Button, Form, Input, message, Select, Space, Row, Col, Card } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';
import { createOrUpdateRecurringExpense, fetchRecurringExpenseCategoriesSelector } from '../store/RecurringExpenseSelectors';
import { useRecoilValueLoadable, useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { expenseIdState, formState, CreateRecurringExpensePayloadAtom } from '../store/RecurringExpenseAtoms';
import { expenseDataSelector } from '../store/RecurringExpenseSelectors';
import { getLoadableStateAndContents } from 'pages/generic/helpers/LoadableHelper';
import GenericButton from 'pages/generic/components/Button/Button';
import { FORM_RULE, FREQUENCY_OPTIONS, INPUT_AMOUNT_RULE } from 'pages/generic/helpers/const';
import { convertExpenseDataToFormType } from '../store/helpers';
import { CreateRecurringExpenseFormType, CreateRecurringExpensePayloadType } from '../store/RecurringExpenseTypes';
import { useParams } from 'react-router-dom';
import { Modal, Spin, InputNumber } from 'antd';
import { DataResponseType } from 'pages/generic/apiUtils/apiTypes';
import { fetchCurrenciesSelector } from 'pages/home/Home/store/CurrencySelectors';
import moment from 'moment';
import dayjs from 'dayjs';

const { Option } = Select;
const { Item } = Form;

const CreateRecurringExpenseModal = () => {
    const navigate = useNavigate();
    const { expenseId } = useParams();
    const [expenseIdFromState, setExpenseIdState] = useRecoilState(expenseIdState);
    const [recurringExpensePayload, setRecurringExpensePayload] = useRecoilState(CreateRecurringExpensePayloadAtom);
    const categoriesLoadable = useRecoilValueLoadable(fetchRecurringExpenseCategoriesSelector);
    const expenseDataLoadable = useRecoilValueLoadable(expenseDataSelector);
    const createOrUpdateRecurringExpenseLoadable = useRecoilValueLoadable(createOrUpdateRecurringExpense);
    const currenciesLoadable = useRecoilValueLoadable(fetchCurrenciesSelector);
    const [CreateRecurringExpenseForm] = useForm<CreateRecurringExpenseFormType>();
    const formValues = useRecoilValue(formState);
    const [showModal, setShowModal] = useState(false);
    const [isCustomCategory, setIsCustomCategory] = useState(false);
    const [customCategory, setCustomCategory] = useState('');


    const { loading: categoriesLoading, error: categoriesError, data: categories } = getLoadableStateAndContents(categoriesLoadable);
    useEffect(() => {
        if (expenseId) {
            setExpenseIdState(expenseId);
        }
    }, [expenseId]);

    useEffect(() => {
        if (expenseId) {
            const { state, contents } = expenseDataLoadable;
            if (contents != null) {
                const mappedValues = convertExpenseDataToFormType(contents);
                CreateRecurringExpenseForm.setFieldsValue(mappedValues);
            }
        }

    }, [expenseDataLoadable, expenseId]);

    useEffect(() => {
        if (createOrUpdateRecurringExpenseLoadable.state === 'hasValue' && createOrUpdateRecurringExpenseLoadable.contents != undefined) {
            console.log("inside hook:", createOrUpdateRecurringExpenseLoadable)
            const response = createOrUpdateRecurringExpenseLoadable.contents;
            console.log("response in useeffect::", response)

            if (response?.existingId) {
                setShowModal(true);
            } else {
                message.success(response?.message);
                navigate('/recurringExpense');
            }

        } else if (createOrUpdateRecurringExpenseLoadable.state === 'hasError') {
            message.error("An error occurred while processing the request.");
        }
    }, [createOrUpdateRecurringExpenseLoadable, setRecurringExpensePayload, setExpenseIdState]);

    const handleYes = (response: DataResponseType) => {
        if (createOrUpdateRecurringExpenseLoadable.state === 'hasValue' && createOrUpdateRecurringExpenseLoadable.contents != undefined) {
            setExpenseIdState(response.existingId);
        }
        setShowModal(false);
    };

    const handleCategoryChange = (value: string) => {
        setIsCustomCategory(value === "Others");
    };

    const handleSubmit = async (values: CreateRecurringExpenseFormType) => {
        const isoDateString = values.next_expense_date?.format("YYYY-MM-DD") || undefined;
        let amountString: number = NaN;

        if (values.amount !== null) {
            amountString = parseFloat(values.amount.toString());
        }

        const updatedExpenseValues: CreateRecurringExpensePayloadType = {
            category_name: isCustomCategory ? customCategory : values.category_name,
            amount: amountString,
            frequency: values.frequency,
            next_expense_date: isoDateString,
            currency: values.currency,
        };
        setRecurringExpensePayload(updatedExpenseValues)
    };
    const handleReset = () => {
        CreateRecurringExpenseForm.resetFields();
    };
    const endOfNextMonth = dayjs().add(1, 'month').endOf('month');

    return (
        <>
            {categoriesLoading && <Spin fullscreen={true} />}
            <Card className='form-card'>
                <Form
                    layout="vertical"
                    name="recurringExpenseForm"
                    form={CreateRecurringExpenseForm}
                    onFinish={handleSubmit}
                    validateTrigger="onBlur"
                    initialValues={formValues}

                >
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="Category"
                                name="category_name"
                                rules={[{ required: true, message: FORM_RULE }]}
                            >
                                <Select placeholder="Select Category" allowClear showSearch onChange={handleCategoryChange}>
                                    {Array.isArray(categories) && categories.length > 0 ? (
                                        categories.map((category: string, index: number) => (
                                            <Option key={index} value={category}>
                                                {category}
                                            </Option>
                                        ))
                                    ) : (
                                        <Option value="" disabled>
                                            No categories available
                                        </Option>
                                    )}
                                    <Option value="Others">Others</Option>
                                </Select>
                            </Form.Item>
                            {isCustomCategory && (
                                <Form.Item
                                    label="Custom Category"
                                    name="custom_category"
                                    rules={[{ required: true, message: FORM_RULE }]}
                                >
                                    <Input placeholder='Enter custom category' value={customCategory} onChange={(e) => setCustomCategory(e.target.value)} />
                                </Form.Item>
                            )}
                        </Col>

                        <Col span={9}>
                            <Form.Item
                                label="Amount"
                                name="amount"
                                rules={[{ required: true, message: INPUT_AMOUNT_RULE },
                                    { type: 'number', min: 1, message: 'Amount must be greater than 0.' }
                                ]}
                                validateTrigger="onBlur" 
                            >
                                <InputNumber
                                    placeholder='Enter amount'
                                />
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item
                                label="Currency"
                                name="currency"
                                rules={[{ required: true, message: FORM_RULE }]}
                            >
                                <Select placeholder="Select Currency" defaultValue={localStorage.getItem('currency')} disabled={false} allowClear showSearch className='currency-dropdown-recurring-expense'>
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
                        </Col>

                    </Row>
                    <Row justify="space-between" className='last-row'>
                        <Col span={12}>
                            <Item
                                label="Frequency"
                                name="frequency"
                                rules={[{ required: true, message: FORM_RULE }]}
                            >
                                <Select placeholder="Select Frequency" allowClear showSearch>
                                    {FREQUENCY_OPTIONS.map(option => (
                                        <Option key={option.value} value={option.value}>
                                            {option.label}
                                        </Option>
                                    ))}
                                </Select>
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Next Expense Date"
                                name="next_expense_date"
                                rules={[{ required: true, message: FORM_RULE }]}
                            >
                                <DatePicker
                                    format="YYYY-MM-DD"
                                    minDate={dayjs()}
                                    maxDate={endOfNextMonth}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row className='button-row'>
                        <Col>
                            <Item wrapperCol={{ offset: 0 }}>
                                <Space>
                                    <Button className='reset-button' onClick={handleReset}>Reset</Button>
                                    {expenseId ? (
                                        <GenericButton text="Edit" />
                                    ) : (
                                        <GenericButton text="Create" />
                                    )}
                                </Space>
                            </Item>
                        </Col>
                    </Row>
                </Form>
            </Card>

            <Modal
                title="Alert"
                visible={showModal}
                onOk={() => createOrUpdateRecurringExpenseLoadable.state === 'hasValue' && createOrUpdateRecurringExpenseLoadable.contents && handleYes(createOrUpdateRecurringExpenseLoadable.contents)}
                onCancel={() => setShowModal(false)}
            >
                <p>Recurring expense with the same category exists already! Are you sure you want to update it?</p>
            </Modal>

        </>
    );
};

export default CreateRecurringExpenseModal;