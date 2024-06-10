import { DatePicker, Button, Form, Input, message, Select, Space, Row, Col, Card } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';
import { useRecoilValueLoadable, useRecoilState, useRecoilCallback, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { getLoadableStateAndContents } from 'pages/generic/helpers/LoadableHelper';
import GenericButton from 'pages/generic/components/Button/Button';
import { FORM_RULE } from 'pages/generic/helpers/const';
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';
import { fetchIncomeorExpenseCategoriesSelector } from '../store/IncomeExpenseSelectors';
import { incomeExpenseDataSelector, createOrUpdateIncomeOrExpense } from '../store/IncomeExpenseSelectors';
import { CreateIncomeOrExpenseFormType } from '../store/IncomeExpenseTypes';
import { transactionIdState, CreateIncomeOrExpensePayloadAtom, incomeExpenseFormState, TransactionTypeAtom } from '../store/IncomeExpenseAtoms';
import { transactionTotalSelector } from 'pages/home/Home/store/HomeSelectors';
import { IncomeExpenseFiltersAtom, IncomeOrExpenseResponseAtom } from '../store/IncomeExpenseAtoms';

const { Option } = Select;
const { Item } = Form;

interface CreateIncomeOrExpenseProps {
    transactionType: string;
}

const CreateIncomeOrExpense = ({ transactionType }: CreateIncomeOrExpenseProps) => {
    const navigate = useNavigate();
    const { transactionId } = useParams();
    const [transactionIdFromState, setTransactionIdState] = useRecoilState(transactionIdState);
    const [transactionTypeState, setTransactionType] = useRecoilState(TransactionTypeAtom);
    const [CreateIncomeOrExpenseForm] = useForm<CreateIncomeOrExpenseFormType>();
    const categoriesLoadable = useRecoilValueLoadable(fetchIncomeorExpenseCategoriesSelector);
    const incomeExpenseDataLoadable = useRecoilValueLoadable(incomeExpenseDataSelector);
    const [incomeExpensePayload, setIncomeExpensePayload] = useRecoilState(CreateIncomeOrExpensePayloadAtom);
    const incomeExpenseFormValues = useRecoilValue(incomeExpenseFormState);
    const incomeOrExpenseResponseData = useRecoilValue(IncomeOrExpenseResponseAtom);
    const createOrUpdateIncomeOrExpenseLoadable = useRecoilValueLoadable(createOrUpdateIncomeOrExpense);
    const [incomeOrExpensesData, setIncomeOrExpensesData] = useRecoilState(IncomeExpenseFiltersAtom);
    
    const { loading: categoriesLoading, error: categoriesError, data: categories } = getLoadableStateAndContents(categoriesLoadable);
    const { loading: incomeExpenseDataLoading, error: incomeExpenseDataError, data: incomeExpenseData } = getLoadableStateAndContents(incomeExpenseDataLoadable);

    const [isCustomCategory, setIsCustomCategory] = useState(false);
    const [customCategory, setCustomCategory] = useState('');
    
    useEffect(() => {
        if (transactionId) {
            setTransactionIdState(transactionId);
        }
    }, [transactionId, transactionTypeState]);

    useEffect(() => {
        setTransactionType({ transactionType });
    }, [transactionType]);

    useEffect(() => {
        if (transactionId) {
            if (incomeExpenseDataLoadable.state === 'hasValue' && incomeExpenseDataLoadable.contents != undefined) {
                CreateIncomeOrExpenseForm.setFieldsValue(incomeExpenseData);
            }
        }
    }, [incomeExpenseDataLoadable, transactionId]);

    if(localStorage.getItem('response')=="true") {
        localStorage.removeItem('response')
        setIncomeOrExpensesData((prevState) => ({
            ...prevState
        }));
        navigate(`/${transactionType.toLowerCase()}`);
    }

    const handleCategoryChange = (value: string) => {
        setIsCustomCategory(value === "Others");
    };

    const handleSubmit = async (values: CreateIncomeOrExpenseFormType) => {
        let amountString: number = NaN;
        if (values.amount !== null) {
            amountString = parseFloat(values.amount.toString());
        }

        const updatedIncomeOrExpenseValues: CreateIncomeOrExpenseFormType = {
            transaction_type: transactionType.toLowerCase(),
            amount: amountString,
            category_name: isCustomCategory ? customCategory : values.category_name
        };
        setIncomeExpensePayload(updatedIncomeOrExpenseValues)
    };

    const handleReset = () => {
        CreateIncomeOrExpenseForm.resetFields();
        setIsCustomCategory(false);
        setCustomCategory('');
    };
    

    return (
        <>
            {categoriesLoading && <Spin fullscreen={true} />}
            
            
            <Card className='income-expense-form-card'>
                <Form
                    layout="vertical"
                    name="incomeOrExpenseForm"
                    form={CreateIncomeOrExpenseForm}
                    onFinish={handleSubmit}
                    validateTrigger="onBlur"
                    initialValues={incomeExpenseFormValues}
                >
                    <Row justify="space-between">
                        <Form.Item
                            label="Amount"
                            name="amount"
                            rules={[{ required: true, message: FORM_RULE }]}
                        >
                            <Input type="text" placeholder='Enter amount' />
                        </Form.Item>
                    </Row>
                    <Row justify="space-between" className='last-row'>
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
                    </Row>
                    <Row className='button-row'>
                        <Col>
                            <Item wrapperCol={{ offset: 0 }}>
                                <Space>
                                    <Button className='reset-button' onClick={handleReset}>Reset</Button>
                                    {transactionId ? (
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
        </>
    );
};

export default CreateIncomeOrExpense;
