import { DatePicker, Button, Form, Input, message, Select, Space, Row, Col } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';
import { fetchCategoriesSelector, createOrUpdateRecurringExpense } from '../store/RecurringExpenseSelectors';
import { useRecoilValueLoadable, useRecoilState, useRecoilCallback, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { expenseIdState, formState, CreateRecurringExpensePayloadAtom } from '../store/RecurringExpenseAtoms';
import { expenseDataSelector } from '../store/RecurringExpenseSelectors';
import { getLoadableStateAndContents } from 'pages/generic/helpers/LoadableHelper';
import GenericButton from 'pages/generic/components/Button/Button';
import { FORM_RULE, FREQUENCY_OPTIONS } from 'pages/generic/helpers/const';
import { convertExpenseDataToFormType } from '../store/helpers';
import { CreateRecurringExpenseFormType, CreateRecurringExpensePayloadType } from '../store/RecurringExpenseTypes';
import { useParams } from 'react-router-dom';
import { Modal } from 'antd';
import { DataResponseType } from 'pages/generic/apiUtils/apiTypes';

const { Option } = Select;
const { Item } = Form;

const CreateRecurringExpenseModal = () => {
    const navigate = useNavigate();
    const { expenseId } = useParams();
    const [expenseIdFromState, setExpenseIdState] = useRecoilState(expenseIdState);
    const [recurringExpensePayload, setRecurringExpensePayload] = useRecoilState(CreateRecurringExpensePayloadAtom);
    const categoriesLoadable = useRecoilValueLoadable(fetchCategoriesSelector);
    const expenseDataLoadable = useRecoilValueLoadable(expenseDataSelector);
    const createOrUpdateRecurringExpenseLoadable = useRecoilValueLoadable(createOrUpdateRecurringExpense);
    const [CreateRecurringExpenseForm] = useForm<CreateRecurringExpenseFormType>();
    const formValues = useRecoilValue(formState);

    const [valuesToUpdate, setValuesToUpdate] = useState<CreateRecurringExpenseFormType | null>(null);
    const [showModal, setShowModal] = useState(false);


    const { loading: categoriesLoading, error: categoriesError, data: categories } = getLoadableStateAndContents(categoriesLoadable);

    useEffect(() => {
        if (expenseId) {
            setExpenseIdState(expenseId);
        }
    }, [expenseId]);


    useEffect(() => {
        if (expenseId) {
            const { state, contents } = expenseDataLoadable;
            console.log("cont:", contents)
            console.log("st:", state)
            if (contents != null) {
                const mappedValues = convertExpenseDataToFormType(contents);
                CreateRecurringExpenseForm.setFieldsValue(mappedValues);
            }
        }

    }, [expenseDataLoadable, expenseId]);

    useEffect(() => {
        if (createOrUpdateRecurringExpenseLoadable.state === 'hasValue' && createOrUpdateRecurringExpenseLoadable.contents != undefined) {
            console.log("inside hook:",createOrUpdateRecurringExpenseLoadable)
            const response = createOrUpdateRecurringExpenseLoadable.contents;
            console.log("response in useeffect::",response)
         
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
        };
        setRecurringExpensePayload(updatedExpenseValues)
    };
    return (
        <>
            <Form
                layout="vertical"
                name="recurringExpenseForm"
                form={CreateRecurringExpenseForm}
                onFinish={handleSubmit}
                validateTrigger="onBlur"
                initialValues={formValues}
            >

                <Form.Item
                    label="Category"
                    name="category_name"
                    rules={[{ required: true, message: FORM_RULE }]}
                >
                    <Select placeholder="Select Category" allowClear showSearch>
                        {categories?.map((category: string, index: number) => (
                            <Option key={index} value={category}>
                                {category}
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

                <Form.Item
                    label="Next Expense Date"
                    name="next_expense_date"
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
                                <GenericButton text="Reset" />
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

            <Modal
                title="Do you want to update it?"
                visible={showModal}
                onOk={() => createOrUpdateRecurringExpenseLoadable.state === 'hasValue' && createOrUpdateRecurringExpenseLoadable.contents && handleYes(createOrUpdateRecurringExpenseLoadable.contents)}
                onCancel={() => setShowModal(false)}
            >
                <p>Are you sure you want to update it?</p>
            </Modal>

        </>
    );
};

export default CreateRecurringExpenseModal;