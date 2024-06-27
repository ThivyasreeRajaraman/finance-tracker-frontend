import { DatePicker, Button, Form, Input, message, Select, Space, Row, Col, Card,Divider,InputRef } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState,useRef } from 'react';
import { createOrUpdateRecurringExpense, fetchRecurringExpenseCategoriesSelector } from '../store/RecurringExpenseSelectors';
import { useRecoilValueLoadable, useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { expenseIdState, formState, CreateRecurringExpensePayloadAtom } from '../store/RecurringExpenseAtoms';
import { expenseDataSelector } from '../store/RecurringExpenseSelectors';
import { getLoadableStateAndContents } from 'pages/generic/helpers/LoadableHelper';
import GenericButton from 'pages/generic/components/Button/Button';
import { FORM_RULE, FREQUENCY_OPTIONS } from 'pages/generic/helpers/const';
import { convertExpenseDataToFormType } from '../store/helpers';
import { CreateRecurringExpenseFormType, CreateRecurringExpensePayloadType } from '../store/RecurringExpenseTypes';
import { useParams } from 'react-router-dom';
import { Modal, Spin } from 'antd';
import { DataResponseType } from 'pages/generic/apiUtils/apiTypes';
import { fetchCurrenciesSelector } from 'pages/home/Home/store/CurrencySelectors';
import { PlusOutlined } from '@ant-design/icons';

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
    const inputRef = useRef<InputRef>(null);

    const [showModal, setShowModal] = useState(false);
    const [category, setCategory] = useState<string[]>([]);
    const [customCategory, setCustomCategory] = useState('');


    const { loading: categoriesLoading, error: categoriesError, data: categories } = getLoadableStateAndContents(categoriesLoadable);
    useEffect(() => {
        if (expenseId) {
            setExpenseIdState(expenseId);
        }
    }, [expenseId]);

    useEffect(() => {
        if (categoriesLoadable.state === 'hasValue' && categoriesLoadable.contents) {
          setCategory(categoriesLoadable.contents);
        }
      }, [categoriesLoadable]);

    useEffect(() => {
        if (!categories != null) {
            const { state, contents } = expenseDataLoadable;
            if (contents != null) {
                const mappedValues = convertExpenseDataToFormType(contents);
                CreateRecurringExpenseForm.setFieldsValue(mappedValues);
            }
        }

    }, [expenseDataLoadable, expenseId]);

    console.log("categoriessss::",categories)

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


    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomCategory(event.target.value);
    };

    const handleSubmit = async (values: CreateRecurringExpenseFormType) => {
        const isoDateString = values.next_expense_date?.format("YYYY-MM-DD") || undefined;
        let amountString: number = NaN;

        if (values.amount !== null) {
            amountString = parseFloat(values.amount.toString());
        }

        const updatedExpenseValues: CreateRecurringExpensePayloadType = {
            category_name: values.category_name,
            amount: amountString,
            frequency: values.frequency,
            next_expense_date: isoDateString,
            currency: values.currency,
        };
        setRecurringExpensePayload(updatedExpenseValues)
    };

    const addCustomCategory = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        setCategory([...category, customCategory]);
        setCustomCategory('');
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      };
    const handleReset = () => {
        CreateRecurringExpenseForm.resetFields();
        setCustomCategory('')
    };



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
                    <Row justify="space-between">
                        <Col span={12}>
                        <Form.Item
                            label="Category"
                            name="category_name"
                            rules={[{ required: true, message: FORM_RULE }]}
                            >
                                <Select
                                placeholder='Select Category'
                                showSearch
                                dropdownRender={(menu) => (
                                    <>
                                    {menu}
                                    <Divider style={{margin:'8px 0'}}/>
                                    <Space style={{padding:'0 8px 4px'}}>  
                                        <Input
                                            placeholder='Category Name'
                                            ref={inputRef}
                                            value={customCategory}
                                            onChange={handleCategoryChange}
                                            onKeyDown={(e) => e.stopPropagation()}
                                        />
                                        <Button type="text" icon={<PlusOutlined />} onClick={addCustomCategory}>
                                        Add Category
                                        </Button>
                                    </Space>
                                    
                                    </>
                                )}
                                >
                                    {category.map((categoryValue, index) => (
                                        <Option key={index} value={categoryValue}>
                                        {categoryValue}
                                        </Option>
                                    ))}

                                </Select>

                            </Form.Item> 
                        </Col>

                        <Col span={9}>
                            <Form.Item
                                label="Amount"
                                name="amount"
                                rules={[{ required: true, message: FORM_RULE }]}
                            >
                                <Input type="text" placeholder='Enter amount' />
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